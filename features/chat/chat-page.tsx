import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useChatContext } from "./context/chat-context";
import { useDataContext } from "./context/data-context";

export function ChatPage() {
  const { threadId } = useParams();
  const { setThreadId, setMessages } = useChatContext();
  const { messages } = useDataContext();

  useEffect(() => {
    if (!threadId) {
      return;
    }

    // Update thread ID in context
    setThreadId(threadId);

    const getInitialMessages = async () => {
      const mappedMessages = messages
        .filter((message) => message.threadId === threadId)
        .map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.createdAt,
        }))
        .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

      setMessages(mappedMessages);
    };

    getInitialMessages();
  }, [threadId]);

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat />
    </main>
  );
}
