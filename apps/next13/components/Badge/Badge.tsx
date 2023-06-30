import React from "react";
import clsx from "clsx";

interface BadgeProps {
  type: "success" | "warning";
  children: React.ReactNode;
}

const badgeStyles = {
  badge: "text-xs font-semibold mr-2 px-2.5 py-0.5 rounded",
  success: "bg-green-800 text-green-200 dark:bg-green-200 dark:text-green-800",
  warning:
    "bg-yellow-800 text-yellow-200 dark:bg-yellow-200 dark:text-yellow-800",
  danger: "bg-red-800 text-red-200 dark:bg-red-200 dark:text-red-800",
};

function Badge({ children, type }: BadgeProps) {
  return (
    <span className={clsx(badgeStyles.badge, badgeStyles[type])}>
      {children}
    </span>
  );
}

export default Badge;
