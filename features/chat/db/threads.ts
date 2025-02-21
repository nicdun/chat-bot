import { db, Thread } from "@/app/shared/index-db-adapter";

export const addThread = (thread: Thread) => {
  return db.threads.add(thread);
};
