import Link from "next/link";
import { buttonVariants } from "@/core/components/button.component";
import { Container } from "@/core/components/container.component";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="text-sm font-medium text-brand">404</p>
      <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="flex gap-3">
        <Link href="/" data-testid="not-found-home-link" className={buttonVariants("primary", "md")}>
          Back to Home
        </Link>
        <Link href="/cars" data-testid="not-found-browse-cars-link" className={buttonVariants("outline", "md")}>
          Browse Cars
        </Link>
      </div>
    </Container>
  );
}
