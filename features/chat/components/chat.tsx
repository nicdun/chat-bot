"use client";

import { db } from "@/app/shared/index-db-adapter";
import { useData } from "@/app/shared/index-db-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@ai-sdk/react";
import { OctagonX, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoadingMessage } from "../../../components/loading";
import { upsertMessages } from "../db/messages";
import { Message } from "./message";
import { Preview } from "./preview";
import { addThread } from "../db/threads";

export default function Chat({ threadId }: { threadId?: string }) {
  const { toast } = useToast();
  const [threadIdState, setThreadIdState] = useState<string>("");
  const [containerObserverRef, messagesEndRef] = useScrollToBottom();
  const { messages: messagesIndexDb } = useData();

  const {
    messages,
    setMessages,
    handleSubmit,
    handleInputChange,
    input,
    setInput,
    append,
    isLoading,
    stop,
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
  });

  useEffect(() => {
    if (threadId) setThreadIdState(threadId);
  }, [threadId]);

  useEffect(() => {
    if (!threadIdState || messagesIndexDb?.length === 0) {
      return;
    }

    const messages =
      messagesIndexDb?.filter((m) => m.threadId === threadIdState) || [];
    const mappedMessages = messages
      .map((message) => ({
        id: message.id,
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
      }))
      .sort((a, b) => a.createdAt!.getTime() - b.createdAt!.getTime());

    setMessages(mappedMessages);
  }, [threadIdState, messagesIndexDb]);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    async function saveMessages() {
      const mappedMessages = messages.map((message) => ({
        id: message.id,
        createdAt: message.createdAt!,
        role: message.role,
        content: message.content,
        threadId: threadIdState,
      }));
      await upsertMessages(mappedMessages);
    }
    saveMessages();
  }, [messages]);

  const handleSubmitForm = async (e: Event) => {
    if (!threadIdState) {
      await createThread();
    }
    handleSubmit(e);
  };

  const createThread = async () => {
    const thread = {
      id: uuidv4(),
      created_at: new Date(),
      title: input.substring(0, 50),
      updated_at: new Date(),
    };

    await addThread(thread);

    setThreadIdState(newThreadId);
    window.history.pushState({}, "", `/chat/${newThreadId}`);
  };

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-28px)] px-2 pt-2 md:pt-0 bg-background items-center">
      <div
        ref={containerObserverRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 w-full md:max-w-3xl"
      >
        {messages.length === 0 && <Preview></Preview>}
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        <div />
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <LoadingMessage />}
        <div ref={messagesEndRef}></div>
      </div>

      <form
        onSubmit={handleSubmitForm}
        className="flex bg-background gap-2 w-full md:max-w-3xl"
      >
        <div className="relative w-full">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();

                if (isLoading) {
                  toast({
                    title: "Error",
                    description:
                      "Please wait for the current message to finish processing.",
                    variant: "destructive",
                  });
                  return;
                }

                handleSubmitForm(e);
              }
            }}
            disabled={isLoading}
            className="bg-secondary grow resize-none max-h-64 min-h-28 rounded-none rounded-se-xl rounded-ss-xl"
            rows={3}
          />
          {isLoading ? (
            <Button
              size="icon"
              onClick={stop}
              className="absolute right-4 bottom-4 rounded-full"
            >
              <OctagonX className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              size="icon"
              type="submit"
              className="absolute right-4 bottom-4 rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
