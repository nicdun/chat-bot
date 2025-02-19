"use client";

import { db } from "@/app/shared/db";
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
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

export function AppSidebar() {
  const [chats, setChats] = useState([
    { title: "Settings", icon: Settings, url: "/settings" },
    { title: "Help", icon: HelpCircle, url: "/help" },
  ]);
  const navigate = useNavigate();

  const handleNewChat = () => {
    const threadId = uuidv4();

    db.threads
      .add({
        id: threadId,
        created_at: new Date(),
        title: threadId,
        updated_at: new Date(),
      })
      .then(() => {
        navigate(`/chat/${threadId}`);
      });
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
