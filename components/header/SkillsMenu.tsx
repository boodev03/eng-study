import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { BookOpen, Headphones, Pencil } from "lucide-react";
import Link from "next/link";

export function SkillsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Skills</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-3">
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/listening"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <Headphones className="shrink-0 mr-2" />
                  Listening
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Improve your listening skills with audio exercises
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/reading"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <BookOpen className="shrink-0 mr-2" />
                  Reading
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Enhance your reading comprehension with various texts
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/writing"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <Pencil className="shrink-0 mr-2" />
                  Writing
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Practice your writing skills with guided exercises
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
