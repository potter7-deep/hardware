import db from '../config/database.js';

export const getCart = (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = db.prepare(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ cartItems, total });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const addToCart = (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    const existingItem = db.prepare('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?').get(userId, productId);

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(newQuantity, existingItem.id);
    } else {
      // Insert new item
      if (quantity > product.stock) {
        return res.status(400).json({ error: 'Not enough stock available' });
      }
      db.prepare('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)').run(userId, productId, quantity);
    }

    const cartItems = db.prepare(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ cartItems, total });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateCartItem = (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    // Check if cart item belongs to user
    const cartItem = db.prepare('SELECT * FROM cart_items WHERE id = ? AND user_id = ?').get(id, userId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Check stock
    const product = db.prepare('SELECT stock FROM products WHERE id = ?').get(cartItem.product_id);
    if (quantity > product.stock) {
      return res.status(400).json({ error: 'Not enough stock available' });
    }

    db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, id);

    const cartItems = db.prepare(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ cartItems, total });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const removeFromCart = (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if cart item belongs to user
    const cartItem = db.prepare('SELECT * FROM cart_items WHERE id = ? AND user_id = ?').get(id, userId);
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    db.prepare('DELETE FROM cart_items WHERE id = ?').run(id);

    const cartItems = db.prepare(`
      SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.image, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({ cartItems, total });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const clearCart = (req, res) => {
  try {
    const userId = req.user.id;
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);
    res.json({ cartItems: [], total: 0 });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

