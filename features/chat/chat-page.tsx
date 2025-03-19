import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useChatContext } from "./context/chat-context";
import { getMessages } from "./db/messages";
import { getThreads } from "./db/threads";

export function ChatPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { setThreadId, setMessages, isLoading } = useChatContext();

  useEffect(() => {
    if (isLoading || !threadId) {
      return;
    }

    const initializeChatContext = async () => {
      const threads = await getThreads();

      const threadExists = !!threads.find((thread) => thread.id === threadId);
      if (!threadExists) {
        navigate("/chat", { replace: true });
        return;
      }

      const messages = await getMessages();

      const mappedMessages = messages
        .filter((message) => message.threadId === threadId)
        .map((message) => ({
          id: message.id,
          role: message.role,
          content: message.content,
          createdAt: message.createdAt,
        }))
        .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

      setThreadId(threadId);
      setMessages(mappedMessages);
    };

    initializeChatContext();
  }, [threadId]);

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat />
    </main>
  );
}
