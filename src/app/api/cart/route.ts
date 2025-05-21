import { type NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import type { CartDocument, CartItemType } from '@/types';
import { placeholderProducts } from '@/lib/placeholder-data'; // To validate product exists

// Helper to generate a unique ID for a cart item based on its properties
function generateCartItemId(productId: string, size: string, colorName: string): string {
  return `${productId}-${size.replace(/\s+/g, '_')}-${colorName.replace(/\s+/g, '_')}`;
}


export async function GET(request: NextRequest) {
  try {
    const cartId = request.headers.get('x-cart-id');
    if (!cartId) {
      return NextResponse.json({ message: 'Cart ID is missing' }, { status: 400 });
    }

    const db = await getDb();
    const cart = await db.collection<CartDocument>('carts').findOne({ cartId });

    if (!cart) {
      return NextResponse.json({ cartId, items: [], createdAt: new Date(), updatedAt: new Date() });
    }
    return NextResponse.json(cart);
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return NextResponse.json({ message: 'Error fetching cart', error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) { // Add/Update item
  try {
    const cartId = request.headers.get('x-cart-id');
    if (!cartId) {
      return NextResponse.json({ message: 'Cart ID is missing' }, { status: 400 });
    }

    const body = await request.json();
    const { productId, quantity, selectedSize, selectedColor } = body;

    if (!productId || typeof quantity !== 'number' || quantity < 1 || !selectedSize || !selectedColor || !selectedColor.name) {
      return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
    
    // Basic validation: Check if product exists (using placeholder data for now)
    const productExists = placeholderProducts.some(p => p.id === productId);
    if (!productExists) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }


    const db = await getDb();
    const cartsCollection = db.collection<CartDocument>('carts');
    const now = new Date();
    const cartItemId = generateCartItemId(productId, selectedSize, selectedColor.name);

    const result = await cartsCollection.findOneAndUpdate(
      { cartId },
      {
        $set: { updatedAt: now },
        $setOnInsert: { createdAt: now, cartId, items: [] }
      },
      { upsert: true, returnDocument: 'after' }
    );

    let updatedCart = result;

    // Now handle the specific item within the cart's items array
    const existingItemIndex = updatedCart?.items.findIndex(item => item.cartItemId === cartItemId);

    if (existingItemIndex !== undefined && existingItemIndex > -1) {
      // Item exists, update its quantity
      const updateResult = await cartsCollection.findOneAndUpdate(
        { cartId, 'items.cartItemId': cartItemId },
        { $inc: { 'items.$.quantity': quantity }, $set: { updatedAt: now } },
        { returnDocument: 'after' }
      );
      updatedCart = updateResult;
    } else {
      // Item does not exist, add it
      const newItem: CartItemType = {
        productId,
        quantity,
        selectedSize,
        selectedColor,
        cartItemId,
      };
      const addResult = await cartsCollection.findOneAndUpdate(
        { cartId },
        { $push: { items: newItem }, $set: { updatedAt: now } },
        { returnDocument: 'after' }
      );
      updatedCart = addResult;
    }

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('Failed to add/update item in cart:', error);
    return NextResponse.json({ message: 'Error adding/updating item in cart', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) { // Specifically to update quantity of an existing item
  try {
    const cartId = request.headers.get('x-cart-id');
    if (!cartId) {
      return NextResponse.json({ message: 'Cart ID is missing' }, { status: 400 });
    }

    const body = await request.json();
    const { cartItemId, newQuantity } = body;

    if (!cartItemId || typeof newQuantity !== 'number' || newQuantity < 0) {
      return NextResponse.json({ message: 'Invalid request body for quantity update' }, { status: 400 });
    }

    const db = await getDb();
    const cartsCollection = db.collection<CartDocument>('carts');
    const now = new Date();

    if (newQuantity === 0) { // If quantity is 0, remove the item
        const result = await cartsCollection.findOneAndUpdate(
            { cartId },
            { $pull: { items: { cartItemId: cartItemId } }, $set: { updatedAt: now } },
            { returnDocument: 'after' }
        );
        return NextResponse.json(result);
    } else { // Otherwise, update quantity
        const result = await cartsCollection.findOneAndUpdate(
            { cartId, "items.cartItemId": cartItemId },
            { $set: { "items.$.quantity": newQuantity, updatedAt: now } },
            { returnDocument: 'after' }
        );
        if (!result) {
            return NextResponse.json({ message: 'Cart or item not found' }, { status: 404 });
        }
        return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Failed to update item quantity in cart:', error);
    return NextResponse.json({ message: 'Error updating item quantity', error: (error as Error).message }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) { // Remove specific item
  try {
    const cartId = request.headers.get('x-cart-id');
    if (!cartId) {
      return NextResponse.json({ message: 'Cart ID is missing' }, { status: 400 });
    }

    const { cartItemId } = await request.json(); // cartItemId is the unique ID like 'productId-size-color'

    if (!cartItemId) {
      return NextResponse.json({ message: 'Cart item ID is missing' }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection<CartDocument>('carts').findOneAndUpdate(
      { cartId },
      { $pull: { items: { cartItemId: cartItemId } }, $set: {updatedAt: new Date()} },
      { returnDocument: 'after' }
    );

    if (!result) {
      return NextResponse.json({ message: 'Cart not found or item not in cart' }, { status: 404 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
    return NextResponse.json({ message: 'Error removing item from cart', error: (error as Error).message }, { status: 500 });
  }
}
