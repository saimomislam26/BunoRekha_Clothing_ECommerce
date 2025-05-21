
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  originalPrice?: number; // For sales/discounts
  images: string[]; // URLs to images
  category: string; // e.g., 'Dresses', 'Tops', 'Bottoms', 'Accessories'
  sizes: string[]; // e.g., ['S', 'M', 'L', 'XL']
  availableSizes: string[]; // Sizes currently in stock
  colors: Array<{ name: string; hex: string }>; // e.g., [{ name: 'Gold', hex: '#D4AF37' }, { name: 'Charcoal', hex: '#333333' }]
  availableColors: Array<{ name: string; hex: string }>; // Colors currently in stock
  style?: string; // e.g., 'Ethnic Fusion', 'Modern Chic', 'Bohemian'
  tags?: string[]; // e.g., ['festive', 'cotton', 'handmade']
  rating?: number; // Average rating 0-5
  reviewsCount?: number;
  stock: number; // Total stock across all variants
  isFeatured?: boolean;
  slug: string; // URL-friendly identifier
  sku?: string; // Stock Keeping Unit
  dataAiHint?: string; // For placeholder image generation
}

// This represents the item structure as stored in localStorage
export interface StoredCartItem {
  productId: string; 
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  cartItemId: string; // Unique identifier for this item variant in the cart (e.g., productId-size-color)
}

// This is used for UI display after enriching StoredCartItem with full Product details
export interface CartItem extends StoredCartItem {
  product: Product; // On client, 'product' is non-optional after merging
  id: string; // Client-side unique key for React lists (can be same as cartItemId)
}


export interface WishlistItem {
  product: Product;
  id: string; // Typically product.id
}
