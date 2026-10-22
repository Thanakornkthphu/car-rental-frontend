export const MIN_PASSWORD_LENGTH = 6;

export const PASSWORD_CRITERIA = [
  {
    id: "lowercase",
    regex: /[a-z]/,
    message: "at least one lowercase letter (a-z)",
  },
  {
    id: "uppercase",
    regex: /[A-Z]/,
    message: "at least one uppercase letter (A-Z)",
  },
  {
    id: "number",
    regex: /[0-9]/,
    message: "at least one number (0-9)",
  },
  {
    id: "special",
    regex: /[!@#$%^&*(),.?":{}|<>+\-/_=]/,
    message: "at least one symbol, such as ! @ #",
  },
];

export function getPasswordError(password: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
  }

  const missingCriterion = PASSWORD_CRITERIA.find(({ regex }) => !regex.test(password));
  return missingCriterion ? `Your password must include ${missingCriterion.message}.` : null;
}
