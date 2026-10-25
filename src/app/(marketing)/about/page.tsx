import Link from "next/link";
import { Container } from "@/core/components/container.component";
import { Card } from "@/core/components/card.component";
import { Badge } from "@/core/components/badge.component";

const TECH_STACK = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Server Actions"];

export default function AboutPage() {
  return (
    <Container className="flex max-w-2xl flex-col gap-8 py-16">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">About Prompt Drive</h1>
        <p className="mt-2 text-muted-foreground">
          Prompt Drive is a portfolio project — a car rental booking experience built to demonstrate frontend
          architecture, shared component design, and modern Next.js patterns. It is not a real rental
          service.
        </p>
      </div>

      <Card padding="md" className="flex flex-col gap-3">
        <h2 className="font-semibold text-foreground">Built with</h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech) => (
            <Badge key={tech} color="brand">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>

      <Card padding="md" className="flex flex-col gap-3">
        <h2 className="font-semibold text-foreground">Get in touch</h2>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="mailto:hello@example.com" data-testid="about-email-link" className="text-brand hover:underline">
            hello@example.com
          </Link>
          <Link href="https://github.com" data-testid="about-github-link" className="text-brand hover:underline">
            github.com
          </Link>
        </div>
      </Card>
    </Container>
  );
}
