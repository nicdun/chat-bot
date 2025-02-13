import { AppSidebar } from "@/components/app-sidebar";
import Chat from "@/components/chat";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <div className="w-full flex">
        <AppSidebar />
        <main className="flex-1 h-full flex flex-col">
          <SidebarTrigger />
          <Chat />
          <Toaster />
        </main>
      </div>
    </SidebarProvider>
  );
}
