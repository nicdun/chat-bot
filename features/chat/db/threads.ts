import { db, Thread } from "@/app/shared/index-db-adapter";
import { v4 as uuidv4 } from "uuid";

export const addThread = async (thread: Thread) => {
  const id = uuidv4();
  await db.threads.add({ ...thread, id });
  return id;
};
