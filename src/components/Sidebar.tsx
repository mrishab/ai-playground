import React from "react";
import { NAV_ITEMS, NavItem } from "./sidebar/sidebarData";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarNavList } from "./sidebar/SidebarNavList";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export { NAV_ITEMS };
export type { NavItem };

export function Sidebar({
  currentView,
  onSelectView,
  isOpen,
  onClose,
}: {
  currentView: string;
  onSelectView: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 top-14 z-20 bg-background/80 backdrop-blur-sm lg:hidden transition-opacity duration-200 animate-in fade-in"
          onClick={onClose}
        />
      )}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-14 bottom-0 left-0 z-30 w-64 shrink-0 border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col overflow-hidden`}
      >
        <SidebarHeader onClose={onClose} />
        <SidebarNavList
          currentView={currentView}
          onSelectView={onSelectView}
          onClose={onClose}
        />
        <SidebarFooter />
      </aside>
    </>
  );
}
