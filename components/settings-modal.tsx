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
import { useDataContext } from "@/features/chat/context/data-context";
import { updateSettings } from "@/features/chat/db/settings";

interface SettingsModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModal) {
  const { settings } = useDataContext();
  const storeInDb = settings.storeInDb;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0">
        <DialogHeader className="border-b py-6 px-6">
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-between h-full px-6 pb-4">
          <Label htmlFor="storage">Store data locally in browser</Label>
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
