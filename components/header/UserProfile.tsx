"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { signOut } from "@/utils/supabase/services/auth-services";
import { ChevronDown, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function UserProfile() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useUser();
  // This function will be called when the user clicks the logout button
  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    router.push("/login");
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 px-3 rounded-md hover:bg-accent">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[99999999]" align="end">
        <div className="flex items-center gap-3 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs text-muted-foreground">Your account</p>
          </div>
        </div>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer"
          disabled={isLoading}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
