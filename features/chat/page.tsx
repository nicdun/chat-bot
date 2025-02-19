import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useParams } from "react-router";
export function ChatPage() {
  const { threadId } = useParams();

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat threadId={threadId!} />
    </main>
  );
}
