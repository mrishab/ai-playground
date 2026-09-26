import React from "react";

export interface NavItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  badge?: string;
}
