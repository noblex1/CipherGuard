"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Lock, Unlock, Activity, LayoutDashboard, BookOpen, FileText, UserCog, ChevronLeft, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/encrypt", label: "Encrypt", icon: Lock },
  { href: "/decrypt", label: "Decrypt", icon: Unlock },
  { href: "/cryptanalysis", label: "Cryptanalysis", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/admin", label: "Admin", icon: UserCog },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme indicators removed — app defaults to light mode

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-card/99 backdrop-blur-md border-r-2 border-border z-40 transition-all duration-300 shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b-2 border-border bg-primary/5">
        {!collapsed && (
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Shield className="h-7 w-7 text-primary transition-all duration-200 group-hover:scale-105" />
            </div>
            <span className="text-lg font-bold gradient-text">
              CipherGuard
            </span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="group">
            <Shield className="h-7 w-7 text-primary transition-all duration-200 group-hover:scale-105 mx-auto" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full transition-all duration-200 group h-11",
                  collapsed ? "justify-center px-2" : "justify-start px-4",
                  isActive 
                    ? "shadow-md" 
                    : "hover:bg-accent hover:shadow-sm"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all duration-200 group-hover:scale-105", 
                  !collapsed && "mr-3"
                )} />
                {!collapsed && <span className="font-semibold text-sm">{item.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t-2 border-border space-y-1.5 bg-muted/20">
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full transition-all duration-200 hover:bg-accent hover:shadow-sm h-11 group",
            collapsed ? "justify-center px-2" : "justify-start px-4"
          )}
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-all duration-200 group-hover:scale-105",
              collapsed ? "rotate-180" : "",
              !collapsed && "mr-3"
            )}
          />
          {!collapsed && <span className="font-semibold text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
