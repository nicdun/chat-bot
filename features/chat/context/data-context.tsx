import {
  db,
  DEFAULT_SETTINGS,
  Settings,
} from "@/features/chat/db/index-db-adapter";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 as uuidv4 } from "uuid";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Message, Thread } from "../db/index-db-adapter";
import { upsertMessages as dbUpsertMessages } from "../db/messages";
import { addThread as dbAddThread } from "../db/threads";
import { usePrevious } from "@/lib/utils";

interface DataProviderState {
  messages: Message[];
  threads: Thread[];
  settings: Settings;
  isLoading: boolean;
  upsertMessages: (messages: Message[]) => Promise<void>;
  addThread: (thread: Omit<Thread, "id">) => Promise<string>;
  deleteThread: (id: string) => Promise<void>;
}

const DataContext = createContext<DataProviderState | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [tempMessages, setTempMessages] = useState<Message[]>([]);
  const [tempThreads, setTempThreads] = useState<Thread[]>([]);

  const dbMessages = useLiveQuery(() => db.messages.toArray(), []);
  const dbThreads = useLiveQuery(() => db.threads.toArray(), []);
  const settings =
    useLiveQuery(() => db.settings.get("settings"), []) || DEFAULT_SETTINGS;

  const isLoading = !dbMessages || !dbThreads;

  const storeInDb = settings.storeInDb;

  const prevStoreInDb = usePrevious(storeInDb);

  useEffect(() => {
    const migrateData = async () => {
      if (storeInDb) {
        // RAM -> IndexedDB
        await db.messages.clear();
        await db.threads.clear();
        await db.messages.bulkAdd(tempMessages);
        await db.threads.bulkAdd(tempThreads);
        setTempMessages([]);
        setTempThreads([]);
      } else {
        // IndexedDB -> RAM
        setTempMessages(dbMessages || []);
        setTempThreads(dbThreads || []);
        await db.messages.clear();
        await db.threads.clear();
      }
    };

    // Execute migrateData only when storeInDb changes. See: https://dev.to/mcavaliere/comparing-previous-useeffect-values-in-react-2o4g
    if (prevStoreInDb !== undefined && prevStoreInDb !== storeInDb) {
      migrateData();
    }
  }, [storeInDb, prevStoreInDb]);

  const upsertMessages = async (messages: Message[]) => {
    if (storeInDb) {
      await dbUpsertMessages(messages);
    } else {
      setTempMessages((prevMessages) => {
        const messagesMap = new Map(prevMessages.map((m) => [m.id, m]));

        messages.forEach((newMessage) => {
          messagesMap.set(newMessage.id, newMessage); // Adds new message or updates existing message
        });

        return Array.from(messagesMap.values());
      });
    }
  };

  const addThread = async (thread: Omit<Thread, "id">) => {
    const id = uuidv4();
    if (storeInDb) {
      await dbAddThread({ ...thread, id });
    } else {
      setTempThreads((prev) => [...prev, { ...thread, id }]);
    }
    return id;
  };

  const deleteThread = async (id: string) => {
    if (storeInDb) {
      await db.threads.delete(id);
      await db.messages.where("threadId").equals(id).delete();
    } else {
      setTempThreads((prev) => prev.filter((thread) => thread.id !== id));
      setTempMessages((prev) =>
        prev.filter((message) => message.threadId !== id)
      );
    }
  };

  return (
    <DataContext.Provider
      value={{
        messages: storeInDb ? dbMessages || [] : tempMessages,
        threads: storeInDb ? dbThreads || [] : tempThreads,
        settings: settings,
        isLoading,
        upsertMessages,
        addThread,
        deleteThread,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
