"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Lock, 
  Unlock, 
  Activity, 
  LayoutDashboard,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, FileText, UserCog, Sun } from "lucide-react";

const bottomNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/encrypt", label: "Encrypt", icon: Lock },
  { href: "/cryptanalysis", label: "Analyze", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

const allNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/encrypt", label: "Encrypt", icon: Lock },
  { href: "/decrypt", label: "Decrypt", icon: Unlock },
  { href: "/cryptanalysis", label: "Cryptanalysis", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/admin", label: "Admin", icon: UserCog },
];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = () => <Sun className="h-5 w-5" />;

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/98 backdrop-blur-2xl border-t-2 border-border/60 z-50 safe-area-inset-bottom shadow-2xl dark:bg-card/98 dark:border-border/40">
        <div className="flex items-center justify-around h-16 px-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 h-full"
              >
                <div
                  className={cn(
                    "flex flex-col items-center justify-center transition-all duration-200",
                    isActive && "text-primary scale-105"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive && "bg-primary/15 shadow-lg shadow-primary/20"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5 transition-all duration-200",
                      isActive && "scale-110"
                    )} />
                  </div>
                  <span className={cn(
                    "text-xs mt-1 font-semibold transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
          
          {/* Menu Button */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full group">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-2 rounded-xl transition-all duration-200 group-hover:bg-muted/50">
                    <Menu className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-xs mt-1 font-semibold text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    Menu
                  </span>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-left flex items-center space-x-2">
                  <div className="relative">
                    <Lock className="h-6 w-6 text-primary" />
                    <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                  </div>
                  <span className="gradient-text font-bold text-xl">CipherGuard</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="space-y-6 overflow-y-auto max-h-[calc(85vh-120px)]">
                {/* Navigation Items */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-3">
                    Navigation
                  </h3>
                  {allNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start text-base h-12",
                            isActive && "shadow-lg shadow-primary/20"
                          )}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>

                {/* Appearance (light-only) */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold text-muted-foreground px-3 mb-3">Appearance</h3>
                  <div className="w-full justify-start text-base h-12 flex items-center">
                    {getThemeIcon()}
                    <span className="ml-3 capitalize">Light Mode</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
}
