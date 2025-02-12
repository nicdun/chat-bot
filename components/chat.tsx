"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@ai-sdk/react";
import { Send } from "lucide-react";
import { Preview } from "./preview";
import { LoadingMessage } from "./message";

export default function Chat() {
  const { toast } = useToast();

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

  return (
    <div className="flex flex-col min-w-0 h-[calc(100dvh-28px)] bg-background items-center">
      <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4 w-full md:max-w-3xl">
        {messages.length === 0 && <Preview />}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" && <LoadingMessage />}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex bg-background gap-2 w-full md:max-w-3xl"
      >
        <div className="relative w-full">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-grow resize-none max-h-64 min-h-20 rounded-none rounded-se-xl rounded-ss-xl"
            rows={3}
          />
          <Button
            size="icon"
            type="submit"
            className="absolute right-2 bottom-2 rounded-full"
            disabled={input.trim() === "" || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
    // <div className="h-[100dvh]">
    //   <div className="relative flex-1  h-[100dvh]">
    //     <div className="overflow-y-scroll p-4 space-y-4 w-full md:max-w-3xl bg-red-900">
    //       {messages.length === 0 && <div>nothing to show</div>}
    //       {messages.map((message) => (
    //         <div
    //           key={message.id}
    //           className={`flex ${
    //             message.role === "user" ? "justify-end" : "justify-start"
    //           }`}
    //         >
    //           <div
    //             className={`max-w-[70%] p-3 rounded-lg ${
    //               message.role === "user"
    //                 ? "bg-blue-500 text-white"
    //                 : "bg-gray-200 text-black"
    //             }`}
    //           >
    //             {message.content}
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <form
    //     className="absolute bottom-0 flex mx-auto px-4 bg-background gap-2 w-full md:max-w-3xl"
    //     onSubmit={handleSubmit}
    //   >
    //     <div className="relative w-full">
    //       <Textarea
    //         placeholder="Type your message..."
    //         value={input}
    //         onChange={handleInputChange}
    //         disabled={isLoading}
    //         className="flex-grow resize-none max-h-64 min-h-20 rounded-none rounded-se-xl rounded-ss-xl"
    //         rows={3}
    //       />
    //       <Button
    //         size="icon"
    //         type="submit"
    //         className="absolute right-2 bottom-2 rounded-full"
    //         disabled={input.trim() === "" || isLoading}
    //       >
    //         <Send className="h-5 w-5" />
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
}
