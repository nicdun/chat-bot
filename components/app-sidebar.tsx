"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HelpCircle, Plus, Settings } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
  const [chats, setChats] = useState([
    { title: "Settings", icon: Settings, url: "/settings" },
    { title: "Help", icon: HelpCircle, url: "/help" },
  ]);

  const handleNewChat = () => {
    // TODO: Implement new chat creation logic
    console.log("Creating new chat");
    // Example of how you might add a new chat
    // setChats([...chats, { title: `Chat ${chats.length + 1}`, icon: MessageCircle, url: `/chat/${chats.length + 1}` }]);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <h2 className="font-bold text-lg">nd.chat</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNewChat}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Chat">
                <SidebarMenuButton asChild>
                  <a href="">
                    <span>CHAT</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {chats.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div> AUTH INFO </div>
      </SidebarFooter>
    </Sidebar>
  );
}
