import db from '../config/database.js';

export const getAllProducts = (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(parseFloat(maxPrice));
    }

    // Sorting
    if (sort === 'price_asc') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'name') {
      query += ' ORDER BY name ASC';
    } else {
      query += ' ORDER BY created_at DESC';
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    const products = db.prepare(query).all(...params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
    const countParams = [];
    
    if (category && category !== 'All') {
      countQuery += ' AND category = ?';
      countParams.push(category);
    }
    if (search) {
      countQuery += ' AND (name LIKE ? OR description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }
    if (minPrice) {
      countQuery += ' AND price >= ?';
      countParams.push(parseFloat(minPrice));
    }
    if (maxPrice) {
      countQuery += ' AND price <= ?';
      countParams.push(parseFloat(maxPrice));
    }

    const { total } = db.prepare(countQuery).get(...countParams);

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createProduct = (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const result = db.prepare(`
      INSERT INTO products (name, description, price, category, image, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, description || '', price, category, image || '', stock || 0);

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, stock } = req.body;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.prepare(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, category = ?, image = ?, stock = ?
      WHERE id = ?
    `).run(
      name || product.name,
      description || product.description,
      price || product.price,
      category || product.category,
      image || product.image,
      stock ?? product.stock,
      id
    );

    const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    res.json({ product: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getCategories = (req, res) => {
  try {
    const categories = db.prepare('SELECT DISTINCT category FROM products ORDER BY category').all();
    res.json({ categories: ['All', ...categories.map(c => c.category)] });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeaturedProducts = (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC LIMIT 8').all();
    res.json({ products });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

