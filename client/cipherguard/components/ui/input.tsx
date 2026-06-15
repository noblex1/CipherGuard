import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full rounded-lg border-2 border-input-border bg-input px-4 py-2 text-base text-foreground transition-all duration-200",
        "placeholder:text-muted-foreground/60",
        "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20",
        "hover:border-input-border/80 dark:hover:border-input-border/60",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted",
        "aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive/20",
        "shadow-sm hover:shadow-md focus-visible:shadow-lg",
        "dark:bg-input dark:border-input-border dark:focus-visible:ring-primary/30 dark:text-foreground",
        "dark:shadow-lg dark:hover:shadow-xl dark:focus-visible:shadow-2xl",
        "file:inline-flex file:h-8 file:items-center file:justify-center file:border-0 file:bg-primary file:text-primary-foreground",
        "file:rounded-md file:px-3 file:text-sm file:font-medium file:mr-4 file:cursor-pointer file:hover:bg-primary/90",
        "md:text-sm md:h-9",
        className
      )}
      {...props}
    />
  )
}

export { Input }

