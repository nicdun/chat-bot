import { v4 as uuidv4 } from "uuid";
import { db, Thread } from "./index-db-adapter";

export const addThread = async (thread: Omit<Thread, "id">) => {
  const id = uuidv4();

  await db.threads.add({
    ...thread,
    id,
  });

  return id;
};
