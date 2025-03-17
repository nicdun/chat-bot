"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { db } from "@/features/chat/db/index-db-adapter";
import { updateSettings } from "@/features/chat/db/settings";
import { useLiveQuery } from "dexie-react-hooks";

interface SettingsModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModal) {
  const settings = useLiveQuery(() => db.settings.get("settings"), []);
  const storeInDb = settings?.storeInDb ?? false;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="border-b py-6 px-6">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-between h-full px-6 pb-4">
          <Label htmlFor="storage">Store Data in IndexDB</Label>
          <Switch
            checked={storeInDb}
            onCheckedChange={() => {
              updateSettings({ storeInDb: !storeInDb });
            }}
          ></Switch>
        </div>
      </DialogContent>
    </Dialog>
  );
}
