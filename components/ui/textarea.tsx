import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground selection:bg-primary/20 selection:text-primary dark:selection:bg-primary/30 dark:selection:text-primary-foreground dark:bg-input flex field-sizing-content min-h-20 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-sm transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive aria-invalid:border-destructive",
        "hover:border-ring/70",
        "focus-visible:border-transparent focus-visible:ring-ring focus-visible:ring-[2px]",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
