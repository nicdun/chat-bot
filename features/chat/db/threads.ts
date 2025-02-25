import { v4 as uuidv4 } from "uuid";
import { db } from "./index-db-adapter";

export const addThread = async (thread: Thread) => {
  const id = uuidv4();

  await db.threads.add({
    id: id,
    ...thread,
  });

  return id;
};
