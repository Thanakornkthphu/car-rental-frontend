import type { BookingStatus } from "@/core/types/booking.type";
import { Badge, type BadgeColor } from "@/core/components/badge.component";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: BadgeColor }> = {
  pending: { label: "Pending", color: "amber" },
  confirmed: { label: "Confirmed", color: "blue" },
  completed: { label: "Completed", color: "emerald" },
  cancelled: { label: "Cancelled", color: "red" },
};

interface StatusPillProps {
  status: BookingStatus;
}

export function StatusPill({ status }: StatusPillProps) {
  const config = STATUS_CONFIG[status];
  return <Badge color={config.color}>{config.label}</Badge>;
}
