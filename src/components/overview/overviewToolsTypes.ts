import React from "react";

export interface OverviewToolItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  algorithms: string[];
}
