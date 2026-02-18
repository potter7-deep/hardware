import db from '../config/database.js';
import { initiateSTKPush, verifyPayment } from '../utils/mpesa.js';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, phone, paymentMethod } = req.body;

    if (!shippingAddress || !phone) {
      return res.status(400).json({ error: 'Shipping address and phone are required' });
    }

    // Get cart items
    const cartItems = db.prepare(`
      SELECT ci.*, p.name, p.price, p.stock
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `).all(userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Check stock and calculate total
    let total = 0;
    for (const item of cartItems) {
      if (item.quantity > item.stock) {
        return res.status(400).json({ error: `Not enough stock for ${item.name}` });
      }
      total += item.price * item.quantity;
    }

    // Determine payment method and status
    const method = paymentMethod || 'cod';

    // Create order
    const orderResult = db.prepare(`
      INSERT INTO orders (user_id, total, shipping_address, phone, status, payment_method, payment_status)
      VALUES (?, ?, ?, ?, 'pending', ?, 'pending')
    `).run(userId, total, shippingAddress, phone, method);

    const orderId = orderResult.lastInsertRowid;

    // Create order items and update stock
    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `);

    const updateStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

    for (const item of cartItems) {
      insertOrderItem.run(orderId, item.product_id, item.quantity, item.price);
      updateStock.run(item.quantity, item.product_id);
    }

    // Clear cart
    db.prepare('DELETE FROM cart_items WHERE user_id = ?').run(userId);

    // Get order with items
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare(`
      SELECT oi.*, p.name, p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(orderId);

    // If M-Pesa payment, initiate STK Push
    let mpesaResult = null;
    if (method === 'mpesa') {
      mpesaResult = await initiateSTKPush(phone, total, orderId);
    }

    res.status(201).json({ 
      order: { ...order, items: orderItems },
      mpesa: mpesaResult
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrders = (req, res) => {
  try {
    const userId = req.user.id;

    // If admin, get all orders
    if (req.user.role === 'admin') {
      const orders = db.prepare(`
        SELECT o.*, u.name as user_name, u.email as user_email
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.created_at DESC
      `).all();
      return res.json({ orders });
    }

    // Regular user gets their orders
    const orders = db.prepare(`
      SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    `).all(userId);

    res.json({ orders });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrderById = (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    let order;
    
    // If admin, get any order
    if (req.user.role === 'admin') {
      order = db.prepare(`
        SELECT o.*, u.name as user_name, u.email as user_email, u.phone as user_phone
        FROM orders o
        JOIN users u ON o.user_id = u.id
        WHERE o.id = ?
      `).get(id);
    } else {
      order = db.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').get(id, userId);
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderItems = db.prepare(`
      SELECT oi.*, p.name, p.image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(id);

    res.json({ order: { ...order, items: orderItems } });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOrderStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);

    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    res.json({ order: updatedOrder });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Verify M-Pesa payment
export const verifyMpesaPayment = async (req, res) => {
  try {
    const { checkoutRequestId, orderId } = req.body;

    if (!checkoutRequestId || !orderId) {
      return res.status(400).json({ error: 'Checkout request ID and order ID are required' });
    }

    // Verify with M-Pesa (or use demo response)
    const result = await verifyPayment(checkoutRequestId);

    if (result.success) {
      db.prepare(`
        UPDATE orders 
        SET payment_status = 'paid'
        WHERE id = ?
      `).run(orderId);
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    res.json({ 
      success: result.success, 
      paymentStatus: order?.payment_status,
      resultDesc: result.resultDesc 
    });
  } catch (error) {
    console.error('Verify M-Pesa payment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// M-Pesa callback handler
export const mpesaCallback = async (req, res) => {
  try {
    const { handleMpesaCallback } = await import('../utils/mpesa.js');
    const result = await handleMpesaCallback(req.body);
    
    // Always return success to M-Pesa
    res.json({ success: true });
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

