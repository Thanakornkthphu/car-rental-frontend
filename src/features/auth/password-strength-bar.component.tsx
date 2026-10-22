import { MIN_PASSWORD_LENGTH, PASSWORD_CRITERIA } from "@/features/auth/password.util";

const STRENGTH_LEVELS = [
  { label: "Password strength", color: "#F2F4F7" },
  { label: "Very weak", color: "#F44336" },
  { label: "Weak", color: "#FFF422" },
  { label: "Fair", color: "#4CAF50" },
  { label: "Good", color: "#4CAF50" },
  { label: "Strong", color: "#4CAF50" },
];

interface PasswordStrengthBarProps {
  password: string;
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const requirements = [
    { id: "length", message: `at least ${MIN_PASSWORD_LENGTH} characters`, isMet: password.length >= MIN_PASSWORD_LENGTH },
    ...PASSWORD_CRITERIA.map(({ id, regex, message }) => ({ id, message, isMet: regex.test(password) })),
  ];
  const strength = requirements.filter(({ isMet }) => isMet).length;
  const level = STRENGTH_LEVELS[strength];

  return (
    <div className="w-full">
      <div
        role="meter"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={requirements.length}
        aria-valuenow={strength}
        aria-valuetext={level.label}
        className="flex gap-[5px]"
      >
        {requirements.map(({ id }, index) => (
          <div
            key={id}
            aria-hidden="true"
            className="h-1.5 flex-1 rounded-full transition-colors duration-300"
            style={{ backgroundColor: index < strength ? level.color : "#F2F4F7" }}
          />
        ))}
      </div>
      <p aria-live="polite" className="mt-1 text-right text-[10px] text-muted-foreground">{level.label}</p>

      <div id="signup-password-requirements" className="mt-5 rounded-lg bg-[#E9F5FA] px-6 py-4 text-sm text-[#0B3B61]">
        <p className="mb-3 font-bold">Your password must include:</p>
        <ul className="list-disc pl-5">
          {requirements.map(({ id, message }) => <li key={id} className="pl-1">{message}</li>)}
        </ul>
      </div>
    </div>
  );
}
