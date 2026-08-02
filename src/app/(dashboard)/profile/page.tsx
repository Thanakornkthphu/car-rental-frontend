import { redirect } from "next/navigation";
import { User as UserIcon, Mail, CalendarDays } from "lucide-react";
import { Container } from "@/core/components/container.component";
import { Card } from "@/core/components/card.component";
import { getCurrentUser } from "@/features/auth/auth.service";
import { getBookings } from "@/features/bookings/booking.service";
import { formatDate } from "@/core/utils/format.util";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { total: bookingCount } = await getBookings({ userId: user._id });

  return (
    <Container className="flex max-w-xl flex-col gap-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">Profile</h1>
      <Card padding="lg" className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <UserIcon className="size-5 text-muted-foreground" aria-hidden="true" />
          <p className="font-medium text-foreground">{user.name}</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
          <p className="text-foreground">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="size-5 text-muted-foreground" aria-hidden="true" />
          <p className="text-foreground">Member since {formatDate(user.createdAt)}</p>
        </div>
        <div className="border-t border-border pt-4 text-sm text-muted-foreground">
          {bookingCount} total {bookingCount === 1 ? "booking" : "bookings"}
        </div>
      </Card>
    </Container>
  );
}
