"use client";

import { Modal } from "@/core/components/modal.component";
import { Button } from "@/core/components/button.component";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  testId: string;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  destructive = false,
  loading = false,
  testId,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} testId={testId}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="mt-6 flex justify-end gap-2">
        <Button testId={`${testId}-cancel-button`} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          testId={`${testId}-confirm-button`}
          variant={destructive ? "destructive" : "primary"}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
