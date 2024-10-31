export async function generateRandomPassword(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  const getRandomChar = (set) => set[Math.floor(Math.random() * set.length)];

  // Ensure password includes at least one of each character type
  const initialPassword = [
    getRandomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
    getRandomChar('abcdefghijklmnopqrstuvwxyz'),
    getRandomChar('0123456789'),
    getRandomChar('!@#$%^&*()_+[]{}|;:,.<>?'),
  ];

  // Generate remaining characters
  for (let i = initialPassword.length; i < length; i++) {
    initialPassword.push(getRandomChar(chars));
  }

  // Shuffle the password to ensure randomness
  return initialPassword.sort(() => 0.5 - Math.random()).join('');
}
