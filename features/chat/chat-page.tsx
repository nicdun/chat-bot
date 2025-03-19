import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useChatContext } from "./context/chat-context";
import { useDataContext } from "./context/data-context";

export function ChatPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { setThreadId, setMessages } = useChatContext();
  const { isLoading, messages, threads } = useDataContext();

  useEffect(() => {
    if (isLoading || !threadId) {
      return;
    }

    const threadExists = !!threads.find((thread) => thread.id === threadId);
    if (!threadExists) {
      navigate("/chat", { replace: true });
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
  }, [threadId, isLoading]);

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat />
    </main>
  );
}
