import { SidebarTrigger } from "@/components/ui/sidebar";
import ChatThread from "@/features/chat/components/chat-thread";
import { useParams, useNavigate } from "react-router";
import { useDataContext } from "./context/data-context";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

export function ChatPage() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { threads: dbThreads, messages, isLoading } = useDataContext();
  const [threadIds, setThreadIds] = useState<string[]>([]);
  const [currentThreadId, setCurrentThreadId] = useState<string | undefined>(
    threadId
  );

  useEffect(() => {
    if (!isLoading) {
      if (!threadId) {
        const id = uuidv4();
        const threadsWithEmptyThread = [...dbThreads, { id }];
        setCurrentThreadId(id);
        setThreadIds(threadsWithEmptyThread.map((t) => t.id));
      } else {
        const threadExists = dbThreads.some((t) => t.id === threadId);
        if (threadExists) {
          setCurrentThreadId(threadId);
          setThreadIds(dbThreads.map((t) => t.id));
        } else {
          navigate("/chat", { replace: true });
        }
      }
    }
  }, [threadId, isLoading]);

  const getInitialMessagesByThreadId = (threadId: string) => {
    return messages
      .filter((message) => message.threadId === threadId)
      .map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
      }))
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());
  };

  return (
    <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      {threadIds.map((tId) => (
        <ChatThread
          key={tId}
          threadId={tId}
          initialMessages={getInitialMessagesByThreadId(tId)}
          active={tId === currentThreadId}
        />
      ))}
    </main>
  );
}
