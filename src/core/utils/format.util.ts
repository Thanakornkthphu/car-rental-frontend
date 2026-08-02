const THB_FORMATTER = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatCurrencyTHB(amount: number): string {
  return THB_FORMATTER.format(amount);
}

export function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

export function countRentalDays(startDate: string, endDate: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const days = Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / msPerDay);
  return Math.max(days, 1);
}

export function calculateTotalPrice(pricePerDay: number, startDate: string, endDate: string): number {
  return pricePerDay * countRentalDays(startDate, endDate);
}

export function maskCardNumber(cardNumber: string): string {
  return cardNumber.replace(/\s/g, "").slice(-4);
}
