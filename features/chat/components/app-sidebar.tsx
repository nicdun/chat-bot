"use client";

import { useLiveQuery } from "dexie-react-hooks";
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
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarThemeToggle } from "../../../components/sidebar-theme-toggle";
import { db } from "@/features/chat/db/index-db-adapter";
import SettingsButton from "@/components/settings-button";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const threads = useLiveQuery(() => db.threads.toArray(), []);

  const handleNewChat = () => {
    navigate(`/chat`);
  };

  const handleDeleteThread = async (threadId: string) => {
    await db.threads.delete(threadId);
    await db.messages.where("threadId").equals(threadId).delete();
    navigate(`/chat`);
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-between items-center">
              <h2 className="font-bold text-lg">nd.chat</h2>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleNewChat}
                        className="h-8 w-8 hover:cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create new chat</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {threads?.map((thread) => (
                  <SidebarMenuItem
                    key={thread.id}
                    className={`rounded-md flex justify-between items-center p-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground truncate ${
                      location.pathname === `/chat/${thread.id}`
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : ""
                    }`}
                  >
                    <SidebarMenuButton asChild>
                      <Link to={`/chat/${thread.id}`} className="max-w-[80%]">
                        <span className="truncate">{thread.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteThread(thread.id)}
                            className="h-8 w-8 hover:cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Thread</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon">
              <a href="/help">
                <HelpCircle />
              </a>
            </Button>
            <div>
              <SidebarThemeToggle></SidebarThemeToggle>
              <SettingsButton></SettingsButton>
            </div>
          </div>
          {/* <div> AUTH INFO </div> */}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
