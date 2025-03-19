import { db, Message } from "./index-db-adapter";

export async function getMessages() {
  return db.messages.toArray();
}

export async function upsertMessages(messages: Message[]) {
  const existingMessages = await db.messages.bulkGet(messages.map((m) => m.id));
  const messagesToUpdate = messages.filter((m, i) => existingMessages[i]);
  const messagesToAdd = messages.filter((m, i) => !existingMessages[i]);

  if (messagesToUpdate.length > 0) {
    await db.messages.bulkPut(messagesToUpdate);
  }

  if (messagesToAdd.length > 0) {
    await db.messages.bulkAdd(messagesToAdd);
  }
}

export async function deleteMessagesByThreadId(threadId: string) {
  await db.messages.where("threadId").equals(threadId).delete();
}

export async function deleteMessages() {
  await db.messages.clear();
}
