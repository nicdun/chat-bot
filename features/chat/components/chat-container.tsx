"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom";
import { useToast } from "@/hooks/use-toast";
import { OctagonX, Send } from "lucide-react";
import { LoadingMessage } from "../../../components/loading";
import { Message } from "./message";
import { Preview } from "./preview";
import { LlmInfoModal } from "./llm-info-modal";
import { useState } from "react";
import { UseChatHelpers } from "@ai-sdk/react";

type ChatContainerType = Pick<
  UseChatHelpers,
  "messages" | "isLoading" | "input" | "handleInputChange" | "stop"
> & {
  handleSubmitForm: UseChatHelpers["handleSubmit"];
};

export default function ChatContainer({
  messages,
  isLoading,
  handleSubmitForm,
  handleInputChange,
  input,
  stop,
}: ChatContainerType) {
  const { toast } = useToast();

  const [containerObserverRef, messagesEndRef] = useScrollToBottom();
  const [isLlmInfoModalOpen, setIsLlmInfoModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-28px)] px-2 pt-2 md:pt-0 bg-background items-center max-w-screen">
      <div className="flex-1 overflow-y-scroll pt-4 min-w-0 w-full">
        <div
          ref={containerObserverRef}
          className="flex flex-col gap-6 md:max-w-3xl mx-auto"
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
      </div>
      <div className="text-muted-foreground pb-1 text-center">
        Always check the sources! LLMs are not 100% accurate.{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLlmInfoModalOpen(true);
          }}
          className="text-sidebar-foreground hover:underline hover:text-muted-foreground"
        >
          Learn more
        </a>
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

      {/* LLM Information Modal */}
      <LlmInfoModal
        isOpen={isLlmInfoModalOpen}
        onClose={() => setIsLlmInfoModalOpen(false)}
      />
    </div>
  );
}
