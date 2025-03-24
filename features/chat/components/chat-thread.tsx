"use client";

import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
import { useDataContext } from "../context/data-context";
import {
  useChat,
  UseChatHelpers,
  Message as AISDKMessage,
} from "@ai-sdk/react";
import { useEffect } from "react";
import ChatContainer from "./chat-container";

export default function ChatThread({
  threadId,
  initialMessages,
  active,
}: {
  threadId: string;
  initialMessages?: AISDKMessage[];
  active: boolean;
}) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { saveMessage, threads, addThread } = useDataContext();

  const {
    messages,
    handleSubmit,
    handleInputChange,
    input,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    key: threadId,
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
    experimental_prepareRequestBody({ messages }) {
      const latestMessage = messages[messages.length - 1];
      saveLatestMessage(latestMessage);
    },
    onFinish: (message) => {
      saveLatestMessage(message);
    },
  });

  const saveLatestMessage = async (latestMessage: AISDKMessage) => {
    await saveMessage({
      ...latestMessage,
      createdAt: latestMessage.createdAt!,
      threadId,
    });
  };

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, []);

  const handleSubmitForm: UseChatHelpers["handleSubmit"] = async (e) => {
    const threadIsExisting = threads.find((t) => t.id === threadId);
    if (!threadIsExisting) {
      await addThread({
        id: threadId,
        created_at: new Date(),
        title: input.substring(0, 50),
        updated_at: new Date(),
      });
      navigate(`/chat/${threadId}`, { replace: true });
    }
    handleSubmit(e);
  };

  return (
    active && (
      <ChatContainer
        messages={messages}
        handleSubmitForm={handleSubmitForm}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        stop={stop}
        input={input}
      ></ChatContainer>
    )
  );
}
