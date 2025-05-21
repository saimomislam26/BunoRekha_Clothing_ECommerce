// Helper to generate a unique ID for a cart item based on its properties
// This ID helps in identifying a specific variant (product + size + color) in the cart.
export function generateCartItemId(productId: string, size: string, colorName: string): string {
  const safeSize = size.replace(/\s+/g, '_');
  const safeColorName = colorName.replace(/\s+/g, '_');
  return `${productId}-${safeSize}-${safeColorName}`;
}
