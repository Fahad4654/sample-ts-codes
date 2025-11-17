type PasswordOptions = {
  length: number;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeUppercase: boolean;
};

const defaultOptions: PasswordOptions = {
  length: 12,
  includeNumbers: true,
  includeSymbols: true,
  includeUppercase: true,
};

function generatePassword(options: PasswordOptions = defaultOptions): string {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=`~[]\{}|;\':",./<>?';

  let allowedChars = lowercaseChars;

  if (options.includeUppercase) {
    allowedChars += uppercaseChars;
  }

  if (options.includeNumbers) {
    allowedChars += numberChars;
  }

  if (options.includeSymbols) {
    allowedChars += symbolChars;
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randomIndex];
  }

  return password;
}

function testPasswordGenerator() {
  const password1 = generatePassword();
  const password2 = generatePassword({ length: 16, includeNumbers: false, includeSymbols: false, includeUppercase: false });
  const password3 = generatePassword({ length: 8, includeNumbers: false, includeSymbols: false, includeUppercase: true });

  console.log("Password 1:", password1);
  console.log("Password 2:", password2);
  console.log("Password 3:", password3);
}

testPasswordGenerator();