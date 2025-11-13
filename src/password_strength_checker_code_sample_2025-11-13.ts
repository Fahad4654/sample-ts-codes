interface StrengthResult {
  strength: 'weak' | 'moderate' | 'strong' | 'very strong';
  reasons: string[];
}

function checkPasswordStrength(password: string): StrengthResult {
  const reasons: string[] = [];
  let strength: 'weak' | 'moderate' | 'strong' | 'very strong' = 'weak';

  if (password.length < 8) {
    reasons.push('Password must be at least 8 characters long.');
  }

  if (!/[A-Z]/.test(password)) {
    reasons.push('Password must contain at least one uppercase letter.');
  }

  if (!/[a-z]/.test(password)) {
    reasons.push('Password must contain at least one lowercase letter.');
  }

  if (!/[0-9]/.test(password)) {
    reasons.push('Password must contain at least one number.');
  }

  if (!/[^a-zA-Z0-9]/.test(password)) {
    reasons.push('Password must contain at least one special character.');
  }

  if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)) {
    strength = 'moderate';
  }

  if (password.length >= 12 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    strength = 'strong';
  }
  
  if (password.length >= 16 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) && password.length > 0) {
    strength = 'very strong';
  }

  if (reasons.length === 0 && password.length > 0) {
    if (strength === 'weak') strength = 'moderate';
    reasons.length = 0; // Clear potential initial length issue

  }
  return { strength, reasons };
}

function ratePassword(password: string): string {
    const result = checkPasswordStrength(password);
    return `Password Strength: ${result.strength}, Reasons: ${result.reasons.join(', ') || 'None'}`;
}

// Example Usage:
const password1 = "P@sswOrd123";
const password2 = "weak";
const password3 = "VeryStrongPassword123!";
const password4 = "SuperLongVeryStrongPassword123!";

console.log(ratePassword(password1));
console.log(ratePassword(password2));
console.log(ratePassword(password3));
console.log(ratePassword(password4));