import { v4 as uuidv4 } from 'uuid'; // Need to install uuid: npm install uuid @types/uuid

const CART_ID_KEY = 'bunorekhaCartId';

export function getOrCreateCartId(): string {
  if (typeof window === 'undefined') {
    // This function should only be called on the client-side
    // For server-side rendering or API routes, cartId should be passed differently (e.g., headers)
    console.warn("getOrCreateCartId called on server. Returning empty string.");
    return ''; 
  }
  let cartId = localStorage.getItem(CART_ID_KEY);
  if (!cartId) {
    cartId = uuidv4();
    localStorage.setItem(CART_ID_KEY, cartId);
  }
  return cartId;
}

// Helper to generate a unique ID for a cart item based on its properties
export function generateCartItemId(productId: string, size: string, colorName: string): string {
  return `${productId}-${size}-${colorName}`;
}
