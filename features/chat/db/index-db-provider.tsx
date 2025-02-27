import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/features/chat/db/index-db-adapter";
import { useLiveQuery } from "dexie-react-hooks";
import { Message, Thread } from "./index-db-adapter";

interface DataProviderState {
  messages: Message[];
  threads: Thread[];
}

const DataContext = createContext<DataProviderState>();

export const DataProvider = ({ children }) => {
  const messages = useLiveQuery(() => db.messages.toArray(), []);
  const threads = useLiveQuery(() => db.threads.toArray(), []);

  return (
    <DataContext.Provider value={{ messages, threads }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
