"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface MobileNavToggleProps {
  children: React.ReactNode;
}

export function MobileNavToggle({ children }: MobileNavToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        data-testid="mobile-nav-toggle-button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex size-9 items-center justify-center rounded-button text-foreground hover:bg-surface"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>
      {open && (
        <div data-testid="mobile-nav-menu" className="absolute inset-x-0 top-16 z-20 flex flex-col gap-1 border-b border-border bg-background p-4">
          {children}
        </div>
      )}
    </div>
  );
}
