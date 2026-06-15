"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  iconColor?: string;
  badgeText: string;
  badgeColor?: string;
  title: string;
  description: string;
}

export function PageHeader({
  icon: Icon,
  iconColor = "text-primary",
  badgeText,
  badgeColor = "bg-primary/10 border-primary/20 text-primary",
  title,
  description,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-8 md:mb-12 px-4"
    >
      <div className={`inline-flex items-center space-x-2 ${badgeColor} border rounded-full px-4 py-2 mb-4`}>
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <span className="text-sm font-medium">{badgeText}</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{title}</h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}
