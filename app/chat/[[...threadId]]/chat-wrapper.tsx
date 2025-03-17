"use client";

import dynamic from "next/dynamic";

const ChatRoot = dynamic(() => import("@/features/chat/chat-root"), {
  ssr: false,
});

export default function ChatWrapper() {
  return <ChatRoot />;
}
