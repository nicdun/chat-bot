import { db } from "@/app/shared/index-db-adapter";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
export function ChatPage() {
  const { threadId } = useParams();
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    const loadMessagesFromIndexDb = async () => {
      const messages = await db.messages.where({ threadId }).toArray();
      setMessages(messages);
    };

    loadMessagesFromIndexDb();
  }, []);

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat threadId={threadId} initialMessages={messages} />
    </main>
  );
}
