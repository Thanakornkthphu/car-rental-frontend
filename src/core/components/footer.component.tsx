import Link from "next/link";
import { Container } from "@/core/components/container.component";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Prompt Drive. Portfolio project — not a real rental service.</p>
        <nav className="flex gap-4">
          <Link href="/about" data-testid="footer-about-link" className="hover:text-foreground">
            About
          </Link>
          <Link href="https://github.com" data-testid="footer-github-link" className="hover:text-foreground">
            GitHub
          </Link>
          <Link href="mailto:thanakorn.kthphu@gmail.com" data-testid="footer-contact-link" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
