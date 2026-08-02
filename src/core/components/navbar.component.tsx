import Link from "next/link";
import { LogOut, Shield } from "lucide-react";
import type { User } from "@/core/types/user.type";
import { Container } from "@/core/components/container.component";
import { ThemeToggle } from "@/core/components/theme-toggle.component";
import { MobileNavToggle } from "@/core/components/mobile-nav-toggle.component";
import { Button, buttonVariants } from "@/core/components/button.component";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

function NavLinks({ user, idPrefix }: { user: User | null; idPrefix: string }) {
  return (
    <>
      <Link href="/cars" data-testid={`${idPrefix}-cars-link`} className="text-sm font-medium text-foreground hover:text-brand">
        Cars
      </Link>
      <Link href="/about" data-testid={`${idPrefix}-about-link`} className="text-sm font-medium text-foreground hover:text-brand">
        About
      </Link>
      {user && (
        <>
          <Link href="/bookings" data-testid={`${idPrefix}-bookings-link`} className="text-sm font-medium text-foreground hover:text-brand">
            My Bookings
          </Link>
          <Link href="/profile" data-testid={`${idPrefix}-profile-link`} className="text-sm font-medium text-foreground hover:text-brand">
            Profile
          </Link>
          {user.isAdmin && (
            <Link
              href="/admin/cars"
              data-testid={`${idPrefix}-admin-link`}
              className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-brand"
            >
              <Shield className="size-4" aria-hidden="true" />
              Admin
            </Link>
          )}
        </>
      )}
    </>
  );
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
      <Container className="relative flex h-16 items-center justify-between">
        <Link href="/" data-testid="nav-home-link" className="text-lg font-semibold text-foreground">
          WheelUp
        </Link>
        <nav className="hidden items-center gap-6 sm:flex">
          <NavLinks user={user} idPrefix="nav" />
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <form action={onLogout}>
              <Button testId="nav-logout-button" variant="ghost" size="sm" type="submit">
                <LogOut className="size-4" aria-hidden="true" />
                Logout
              </Button>
            </form>
          ) : (
            <Link href="/login" data-testid="nav-login-signup-link" className={buttonVariants("primary", "sm")}>
              Login / Sign up
            </Link>
          )}
          <MobileNavToggle>
            <NavLinks user={user} idPrefix="nav-mobile" />
          </MobileNavToggle>
        </div>
      </Container>
    </header>
  );
}
