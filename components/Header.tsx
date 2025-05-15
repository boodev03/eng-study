"use client";

import { useUser } from "@/hooks/useUser";
import { Logo } from "./header/Logo";
import { UserProfile } from "./header/UserProfile";
import Navbar from "./Navbar";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="relative z-[100] border-b border-border-gray bg-white backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <div className="mx-auto container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
        </div>
        {/* <UserProfile /> */}
        {user && <Navbar />}
      </div>
    </header>
  );
}
