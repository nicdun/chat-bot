import SettingsModal from "@/components/settings-modal";
import { Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function SettingsButton() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  return (
    <>
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSettingsModalOpen(true)}
      >
        <Settings />
      </Button>
    </>
  );
}
