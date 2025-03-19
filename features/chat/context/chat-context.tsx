"use client";
import { useToast } from "@/hooks/use-toast";
import { useChat, UseChatHelpers } from "@ai-sdk/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useDataContext } from "./data-context";

type ChatContextType = Pick<
  UseChatHelpers,
  | "messages"
  | "isLoading"
  | "input"
  | "handleInputChange"
  | "handleSubmit"
  | "stop"
  | "setInput"
  | "setMessages"
> & {
  handleSubmitForm: UseChatHelpers["handleSubmit"];
  threadId: string | null;
  setThreadId: (id: string | null) => void;
  resetState: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [canSave, setCanSave] = useState(false);
  const navigate = useNavigate();
  const { addThread, upsertMessages } = useDataContext();

  const {
    messages,
    handleSubmit,
    handleInputChange,
    input,
    setInput,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    maxSteps: 4,
    api: "http://127.0.0.1:8000/api/chat",
    body: {
      model: "gemini-2.0-flash",
    },
    onError: (error) => {
      if (error.message.includes("Too many requests")) {
        toast({
          title: "Error",
          description: "Too many requests. Please try again later.",
          variant: "destructive",
        });
      }
    },
    onFinish: () => {
      setCanSave(true);
    },
  });

  useEffect(() => {
    async function saveMessages() {
      if (messages.length === 0 || !threadId) {
        return;
      }

      const mappedMessages = messages.map((message) => ({
        id: message.id,
        createdAt: message.createdAt!,
        role: message.role,
        content: message.content,
        threadId,
      }));

      await upsertMessages(mappedMessages);
    }

    if (canSave) {
      saveMessages();
      setCanSave(false);
    }
  }, [messages, canSave]);

  const handleSubmitForm: UseChatHelpers["handleSubmit"] = async (e) => {
    if (!threadId) {
      const id = await addThread({
        created_at: new Date(),
        title: input.substring(0, 50),
        updated_at: new Date(),
      });
      setThreadId(id);
      navigate(`/chat/${id}`, { replace: true });
    }
    handleSubmit(e);
  };

  const resetState = () => {
    setMessages([]);
    setInput("");
    setThreadId(null);
  };

  const value = {
    messages,
    isLoading,
    input,
    threadId,
    handleInputChange,
    handleSubmit,
    handleSubmitForm,
    stop,
    setInput,
    setMessages,
    setThreadId,
    resetState,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
