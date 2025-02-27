import { db, Message } from "./index-db-adapter";

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
