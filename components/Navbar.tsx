"use client";

import { usePathname } from "next/navigation";
import { UserProfile } from "./header/UserProfile";
import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Practice", href: "/student/practice" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {/* Menu */}
      <div className="flex items-center gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-medium transition-colors ${
              pathname === item.href
                ? "text-primary"
                : "text-gray-600 hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* User + Theme Switch */}
      <div className="flex items-center gap-4">
        <UserProfile />
      </div>
    </nav>
  );
}
