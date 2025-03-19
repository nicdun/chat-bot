import { db, Settings } from "./index-db-adapter";

export const updateSettings = async (newSettings: Partial<Settings>) => {
  await db.settings.update("settings", {
    ...newSettings,
  });
};
