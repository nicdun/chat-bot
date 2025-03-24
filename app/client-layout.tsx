"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/chat/components/app-sidebar";
import dynamic from "next/dynamic";
import { Routes, Route } from "react-router";
import { ChatPage } from "@/features/chat/chat-page";
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/features/chat/context/data-context";

const BrowserRouter = dynamic(
  () => import("react-router").then((mod) => mod.BrowserRouter),
  { ssr: false }
);

export default function ClientLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <BrowserRouter>
      <DataProvider>
        <SidebarProvider>
          <div className="w-full flex flex-col">
            <div className="flex flex-1">
              <AppSidebar />
              <div className="flex-1">
                <Routes>
                  <Route path="/chat" element={<ChatPage />} />
                  <Route path="/chat/:threadId" element={<ChatPage />} />
                </Routes>
                {children}
                <Toaster />
              </div>
            </div>
          </div>
        </SidebarProvider>
      </DataProvider>
    </BrowserRouter>
  );
}
