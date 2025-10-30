"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookHeart,
  BookOpen,
  Bot,
  Brain,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  MessageCircle,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Target,
  Users2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  navMain: [
    { title: "Home", href: "/home", icon: Home },
    { title: "Daily Mood Check-In", href: "/check-in", icon: Calendar },
    { title: "Gratitude Journal", href: "/gratitude", icon: BookHeart },
    { title: "Healio AI", href: "/ai", icon: Sparkles },
    { title: "Activities", href: "/activities", icon: Plus },
    { title: "Story Generator", href: "/stories", icon: BookOpen },
    { title: "Community Forum", href: "/community", icon: Users2 },
    { title: "Goal Tracking", href: "/goals", icon: Target },
    { title: "Anonymous Chats", href: "/chats", icon: MessageCircle },
  ],
};

export function AppSidebar({ user, ...props }) {
  return (
    <Sidebar collapsible="icon" {...props} className="font-montreal">
      <SidebarHeader>
        <img
          src="/images/healio.png"
          alt="logo"
          className="w-[100px] h-[80px]"
        />
        
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
