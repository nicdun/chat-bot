"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarThemeToggle = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const handleToggleTheme = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <Button
      ref={ref}
      data-sidebar="theme-toggle"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        handleToggleTheme();
      }}
      {...props}
    >
      <Sun />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
});
SidebarThemeToggle.displayName = "SidebarThemeToggle";

export { SidebarThemeToggle };
