import Link from "next/link";
import Image from "next/image";
import { BadgeDollarSign, CalendarDays, KeyRound, Search, ShieldCheck, Clock, Star } from "lucide-react";
import { Container } from "@/core/components/container.component";
import { buttonVariants } from "@/core/components/button.component";
import { Card } from "@/core/components/card.component";
import { Badge } from "@/core/components/badge.component";
import { CarGrid } from "@/features/cars/car-grid.component";
import { getCars } from "@/features/cars/car.service";

const VALUE_PROPS = [
  { icon: ShieldCheck, title: "Fully insured", description: "Every rental is covered end to end." },
  { icon: Clock, title: "24/7 support", description: "Help is one call away, day or night." },
  { icon: BadgeDollarSign, title: "No hidden fees", description: "The price you see is the price you pay." },
];

const HOW_IT_WORKS = [
  { icon: Search, title: "Browse & filter", description: "Find the right car for your trip." },
  { icon: CalendarDays, title: "Pick your dates", description: "Choose a pick-up and return date." },
  { icon: KeyRound, title: "Confirm & drive", description: "Pay securely and hit the road." },
];

function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/notionists/png?seed=${encodeURIComponent(seed)}&backgroundColor=f7f7f7`;
}

const TESTIMONIALS = [
  {
    name: "Somchai K.",
    rating: 4.8,
    title: "A Weekend with the Alphard",
    quote:
      "Booking the Alphard for a family trip took less than two minutes. The car was spotless and ready exactly on time.",
    image: "https://loremflickr.com/640/360/minivan,car?lock=301",
  },
  {
    name: "Ploy W.",
    rating: 5.0,
    title: "One Day, Zero Hassle",
    quote: "I only needed a car for one day — no paperwork hassle, just pick up and go. Smoothest rental I've had.",
    image: "https://loremflickr.com/640/360/car,keys?lock=302",
  },
  {
    name: "Nattapong R.",
    rating: 4.9,
    title: "A Smooth Ride in the BYD Atto 3",
    quote: "Rented the BYD Atto 3 for a weekend getaway. Smooth drive, fair price, and booking was painless end to end.",
    image: "https://loremflickr.com/640/360/electriccar,suv?lock=303",
  },
];

export default async function HomePage() {
  const cars = await getCars({ sort: "price-asc" });
  const featuredCars = cars.filter((car) => car.available).slice(0, 6);

  return (
    <div className="flex flex-col">
      <section className="pb-16 sm:pb-24">
        <div className="relative mx-auto w-full max-w-wide overflow-hidden">
          <Image
            src="https://loremflickr.com/1600/700/car,road?lock=401"
            alt=""
            fill
            priority
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
          <Container className="relative flex flex-col items-center gap-6 py-24 text-center sm:py-50">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Rent the right car for every trip
            </h1>
            <p className="max-w-xl text-white/80">
              Compare prices, specs, and availability across our fleet — then book in minutes.
            </p>
            <div className="flex gap-3">
              <Link href="/cars" data-testid="hero-browse-cars-link" className={buttonVariants("primary", "lg")}>
                Browse Cars
              </Link>
              <Link
                href="#how-it-works"
                data-testid="hero-how-it-works-link"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-card border border-white/40 px-6 text-base font-medium text-white transition-colors hover:bg-white/10"
              >
                How it works
              </Link>
            </div>
          </Container>
        </div>
      </section>

      <Container className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center">
            <Icon className="size-8 text-brand" aria-hidden="true" />
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </Container>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Featured cars</h2>
            <Link href="/cars" data-testid="featured-cars-view-all-link" className="text-sm font-medium text-brand hover:underline">
              View all
            </Link>
          </div>
          <CarGrid cars={featuredCars} />
        </Container>
      </section>

      <section id="how-it-works" className="bg-surface py-16 sm:py-24">
        <Container className="flex flex-col gap-8">
          <h2 className="text-center text-xl font-semibold text-foreground">How it works</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ icon: Icon, title, description }, index) => (
              <div key={title} className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <p className="font-medium text-foreground">
                  {index + 1}. {title}
                </p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <Badge color="brand">Customer stories</Badge>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Trusted by <span className="text-brand">everyday renters</span>
            </h2>
            <p className="max-w-xl text-muted-foreground">Real trips from people who booked their ride through WheelUp.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} padding="sm" className="flex flex-col gap-4 border-0">
                <div className="relative h-40 w-full overflow-hidden rounded-card bg-border/40">
                  <Image src={testimonial.image} alt="" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" unoptimized />
                </div>
                <div className="flex flex-1 flex-col gap-2 px-1">
                  <h3 className="font-semibold text-foreground">{testimonial.title}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{testimonial.quote}</p>
                </div>
                <div className="flex items-center justify-between border-t border-border px-1 pt-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={avatarUrl(testimonial.name)}
                      alt=""
                      width={32}
                      height={32}
                      className="size-8 rounded-full bg-border/40"
                      unoptimized
                    />
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <Star className="size-4 fill-brand text-brand" aria-hidden="true" />
                    {testimonial.rating.toFixed(1)}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand py-20 sm:py-28">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-semibold text-brand-foreground">Ready to hit the road?</h2>
          <Link
            href="/cars"
            data-testid="cta-browse-cars-link"
            className="inline-flex h-12 items-center justify-center rounded-card bg-background px-6 text-base font-medium text-brand transition-colors hover:opacity-90"
          >
            Browse Cars
          </Link>
        </Container>
      </section>
    </div>
  );
}
