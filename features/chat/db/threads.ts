import { db, Thread } from "./index-db-adapter";

export const addThread = async (thread: Thread) => {
  await db.threads.add(thread);
};
