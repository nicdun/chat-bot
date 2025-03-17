import { db } from "@/features/chat/db/index-db-adapter";
import { useLiveQuery } from "dexie-react-hooks";
import { createContext, useContext, ReactNode } from "react";
import { Message, Thread } from "./index-db-adapter";

interface DataProviderState {
  messages: Message[];
  threads: Thread[];
}

const DataContext = createContext<DataProviderState>({
  messages: [],
  threads: [],
});

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const messages = useLiveQuery(() => db.messages.toArray(), []) || [];
  const threads = useLiveQuery(() => db.threads.toArray(), []) || [];

  return (
    <DataContext.Provider value={{ messages, threads }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
