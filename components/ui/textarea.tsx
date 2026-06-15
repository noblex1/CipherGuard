import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-lg border-2 border-input-border bg-input px-4 py-3 text-base text-foreground transition-all duration-200",
        "placeholder:text-muted-foreground/60",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20",
        "hover:border-input-border/80 dark:hover:border-input-border/60",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
        "shadow-sm hover:shadow-md focus-visible:shadow-lg",
        "dark:bg-input dark:border-input-border dark:focus-visible:ring-primary/30 dark:text-foreground",
        "dark:shadow-lg dark:hover:shadow-xl dark:focus-visible:shadow-2xl",
        "resize-vertical",
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

