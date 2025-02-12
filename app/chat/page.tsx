import Chat from "@/components/chat";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ToastProvider } from "@/components/ui/toast";

export default function ChatPage() {
  return (
    <SidebarProvider>
      <ToastProvider>
        <div className="w-full flex">
          <AppSidebar />
          <main className="flex-1 h-full flex flex-col">
            <SidebarTrigger />
            <Chat />
          </main>
        </div>
      </ToastProvider>
    </SidebarProvider>
  );
}
