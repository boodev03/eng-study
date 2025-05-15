"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";
import { signOut } from "@/utils/supabase/services/auth.service";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function UserProfile() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    router.push("/login");
  };

  if (!user) return null;

  // Get first character of name or email for fallback
  const getInitials = () => {
    const name =
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email ||
      "U";
    return name.charAt(0).toUpperCase();
  };

  // Get display name (prioritize name over email)
  const getDisplayName = () => {
    return (
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 px-3 rounded-full hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={`${getDisplayName()}'s avatar`}
              />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2" align="end">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={user.user_metadata?.avatar_url}
              alt={`${getDisplayName()}'s avatar`}
            />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {getDisplayName()}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
            {user.user_metadata?.role && (
              <p className="text-xs text-primary font-medium capitalize">
                {user.user_metadata.role}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive hover:bg-destructive/10 rounded-md p-3 transition-colors"
          disabled={isLoading}
        >
          <LogOut className="h-4 w-4 mr-3" />
          {isLoading ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
