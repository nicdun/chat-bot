"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChatPage } from "./chat/page";
import { WelcomePage } from "./chat/welcome-page";

export function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <div className="w-full flex">
          <AppSidebar />
          <Routes>
            <Route path="chat" element={<WelcomePage />} />
            <Route path="/chat/:threadId" element={<ChatPage />} />
          </Routes>
          <Toaster />
        </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}
