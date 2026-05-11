export function formatPrice(price: number) {
  return `₹${price}`;
}

export function generateReferralCode(name: string) {
  return name.toUpperCase() + Math.floor(Math.random() * 9999);
}
