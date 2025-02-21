"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Route, Routes } from "react-router";
import { ChatPage } from "./page";
import { WelcomePage } from "./welcome-page";
import { DataProvider } from "@/app/shared/index-db-provider";

export function ChatRoot() {
  return (
    <DataProvider>
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
    </DataProvider>
  );
}
