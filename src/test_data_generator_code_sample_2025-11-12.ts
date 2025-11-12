type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

const generateUserData = (overrides?: Partial<User>): User => {
  const id = crypto.randomUUID();
  const name = `User ${id.substring(0, 8)}`;
  const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
  const age = Math.floor(Math.random() * 70) + 18;
  const isActive = Math.random() < 0.8;

  return {
    id,
    name,
    email,
    age,
    isActive,
    ...overrides,
  };
};

const generateUsers = (count: number, overrides?: Partial<User>[]): User[] => {
  return Array.from({ length: count }, (_, i) => {
    return generateUserData(overrides?.[i]);
  });
};

export { generateUserData, generateUsers };