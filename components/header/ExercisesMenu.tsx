import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { AlignJustify, CheckSquare, Edit } from "lucide-react";
import Link from "next/link";

export function ExercisesMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Exercises</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-3">
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/exercises/fill-in-blank"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <Edit className="shrink-0 mr-2" />
                  Fill in the Blanks
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Practice filling in the missing words in sentences
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/exercises/multiple-choice"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <CheckSquare className="shrink-0 mr-2" />
                  Multiple Choice
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Practice with multiple choice questions
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink asChild>
              <Link
                href="/exercises/sentence-arrangement"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              >
                <div className="flex items-center text-sm font-medium leading-none">
                  <AlignJustify className="shrink-0 mr-2" />
                  Sentence Arrangement
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Practice arranging words into complete sentences
                </p>
              </Link>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
