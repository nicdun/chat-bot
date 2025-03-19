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

interface Settings {
  id: string;
  storeInDb: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  id: "settings",
  storeInDb: true,
};

const db = new Dexie("chatDb") as Dexie & {
  threads: EntityTable<Thread, "id">;
  messages: EntityTable<Message, "id">;
  settings: EntityTable<Settings, "id">;
};

db.version(1).stores({
  threads: "++id, title, created_at, updated_at, model",
  messages: "++id, createdAt, role, content, threadId, model, status",
  settings: "id, storeInDb",
});

db.on("populate", async () => {
  await db.settings.add(DEFAULT_SETTINGS);
});

export { db, DEFAULT_SETTINGS };
export type { Message, Thread, Settings };
