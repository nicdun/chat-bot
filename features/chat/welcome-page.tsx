import { SidebarTrigger } from "@/components/ui/sidebar";
import Chat from "@/features/chat/components/chat";


export function WelcomePage() {
    return (
      <main className="flex-1 h-full flex flex-col">
      <SidebarTrigger />
      <Chat threadId={'welcomeMessage'}/>
    </main>
    )
}