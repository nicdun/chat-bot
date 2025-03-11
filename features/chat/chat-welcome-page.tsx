import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useEffect } from "react";
import { useChatContext } from "./context/chat-context";

export function WelcomePage() {
  const { resetState } = useChatContext();

  useEffect(() => {
    resetState();
  }, [resetState]);

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat />
    </main>
  );
}
