import Link from "next/link";
import { buttonVariants } from "@/core/components/button.component";
import { Container } from "@/core/components/container.component";

export default function CarNotFound() {
  return (
    <Container className="flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Car not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">This car may have been removed from the fleet.</p>
      <Link href="/cars" data-testid="car-not-found-back-link" className={buttonVariants("primary", "md")}>
        Back to Cars
      </Link>
    </Container>
  );
}
