"use client";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useUser } from "@/hooks/useUser";
import { ExercisesMenu } from "./header/ExercisesMenu";
import { Logo } from "./header/Logo";
import { SkillsMenu } from "./header/SkillsMenu";
import { UserProfile } from "./header/UserProfile";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="relative z-[100] border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="mx-auto container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          {user && (
            <NavigationMenu className="relative">
              <NavigationMenuList>
                <ExercisesMenu />
                <SkillsMenu />
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <UserProfile />
      </div>
    </header>
  );
}
