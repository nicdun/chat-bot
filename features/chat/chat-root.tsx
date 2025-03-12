"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChatPage } from "./chat-page";
import { WelcomePage } from "./chat-welcome-page";
import { ChatProvider } from "./context/chat-context";
import { AppSidebar } from "@/features/chat/components/app-sidebar";

export default function ChatRoot() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="w-full flex flex-col">
          <div className="flex flex-1">
            <AppSidebar />
            <ChatProvider>
              <Routes>
                <Route path="chat" element={<WelcomePage />} />
                <Route path="/chat/:threadId" element={<ChatPage />} />
              </Routes>
            </ChatProvider>
            <Toaster />
          </div>
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}
