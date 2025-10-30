"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import React, { useEffect, useState } from 'react'
import { getAuth,signOut,onAuthStateChanged  } from "firebase/auth";
import { useRouter } from 'next/navigation';



export function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const auth = getAuth(); // Ensure you initialize auth correctly

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.log("Error signing out:", error.message);
    }
  };

  // If user is not available yet, render a placeholder or skeleton
  if (!user) {
    return (
      <div className="flex items-center p-4">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg">?</AvatarFallback>
        </Avatar>
        <div className="ml-2 text-sm">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.photoURL || "/default-avatar.png"} alt={user.displayName || "User"} />
                <AvatarFallback className="rounded-lg">
                  {user.displayName ? user.displayName.charAt(0) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-[#323d2c] truncate font-semibold">{user.displayName || "Guest"}</span>
                <span className="truncate text-xs">{user.email || "guest@example.com"}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          > 
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutUser}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
