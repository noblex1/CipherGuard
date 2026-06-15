"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-1 text-muted-foreground bg-muted/50 border-2 border-border/30 shadow-inner group-data-horizontal/tabs:h-auto group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:border-0 data-[variant=line]:bg-transparent data-[variant=line]:shadow-none dark:bg-muted/30 dark:border-border/20",
  {
    variants: {
      variant: {
        default: "bg-muted/50 dark:bg-muted/30",
        line: "gap-2 bg-transparent border-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-9 flex-1 items-center justify-center gap-2 rounded-md border-2 border-transparent px-4 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-all duration-200",
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
        "hover:text-foreground hover:bg-muted/30",
        "focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
        "has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=default]/tabs-list:data-active:bg-background group-data-[variant=default]/tabs-list:data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-md group-data-[variant=default]/tabs-list:data-active:border-border/50",
        "dark:group-data-[variant=default]/tabs-list:data-active:bg-card dark:group-data-[variant=default]/tabs-list:data-active:border-border/40 dark:group-data-[variant=default]/tabs-list:data-active:shadow-lg",
        "group-data-[variant=line]/tabs-list:border-0 group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent group-data-[variant=line]/tabs-list:data-active:shadow-none",
        "after:absolute after:bg-primary after:opacity-0 after:transition-all after:duration-200",
        "group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-0 group-data-horizontal/tabs:after:h-0.5 group-data-horizontal/tabs:after:rounded-full",
        "group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:right-0 group-data-vertical/tabs:after:w-0.5 group-data-vertical/tabs:after:rounded-full",
        "group-data-[variant=line]/tabs-list:data-active:after:opacity-100 group-data-[variant=line]/tabs-list:data-active:text-primary",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
