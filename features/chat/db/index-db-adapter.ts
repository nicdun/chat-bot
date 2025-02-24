// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Thread {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  model?: string;
}

type Role = "system" | "user" | "assistant" | "data";

interface Message {
  id: string;
  createdAt: Date;
  role: Role;
  content: string;
  threadId: string;
  model?: string;
  status?: string;
}

const db = new Dexie("chatDb") as Dexie & {
  threads: EntityTable<Thread, "id">;
  messages: EntityTable<Message, "id">;
};

db.version(1).stores({
  threads: "++id, title, created_at, updated_at, model",
  messages: "++id, createdAt, role, content, threadId, model, status",
});

export { db };
export type { Message, Thread };
