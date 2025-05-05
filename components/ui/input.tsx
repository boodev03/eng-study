import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground text-dark placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary dark:selection:bg-primary/30 dark:selection:text-primary-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-[6px] border bg-transparent px-3 py-2 text-base shadow-sm transition-all duration-200 outline-none file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "hover:border-ring/70",
        "focus-visible:border-transparent focus-visible:ring-ring focus-visible:ring-[2px]",
        "aria-invalid:ring-destructive aria-invalid:border-destructive aria-invalid:focus-visible:ring-[1px]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
