"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  testId: string;
}

export function Modal({ open, onClose, title, children, testId }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      data-testid={testId}
      onClose={onClose}
      onCancel={onClose}
      className="w-full max-w-md rounded-card border border-border bg-background p-0 text-foreground backdrop:bg-black/50"
    >
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-base font-semibold">{title}</h2>
        <button
          type="button"
          data-testid={`${testId}-close-button`}
          onClick={onClose}
          aria-label="Close dialog"
          className="rounded-button p-1 text-muted-foreground hover:bg-surface"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </dialog>
  );
}
