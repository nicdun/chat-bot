import { db, Thread } from "./index-db-adapter";

export const getThreads = async () => {
  return db.threads.toArray();
};

export const addThread = async (thread: Thread) => {
  await db.threads.add(thread);
};

export const upsertThreads = async (threads: Thread[]) => {
  const existingThreads = await db.threads.bulkGet(threads.map((t) => t.id));
  const threadsToUpdate = threads.filter((_, i) => existingThreads[i]);
  const threadsToAdd = threads.filter((_, i) => !existingThreads[i]);

  if (threadsToUpdate.length > 0) {
    await db.threads.bulkPut(threadsToUpdate);
  }

  if (threadsToAdd.length > 0) {
    await db.threads.bulkAdd(threadsToAdd);
  }
};

export async function deleteThread(id: string) {
  await db.threads.delete(id);
}

export async function deleteThreads() {
  await db.threads.clear();
}
