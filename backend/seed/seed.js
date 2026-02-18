import db from '../config/database.js';
import bcrypt from 'bcryptjs';

const seedProducts = [
  // Building Materials
  {
    name: "Bamburi Cement - 50kg Bag",
    description: "Premium quality cement suitable for all construction needs. Perfect for foundations, walls, and flooring.",
    price: 650,
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
    stock: 500
  },
  {
    name: "Mombasa Cement - 50kg Bag",
    description: "High-strength cement ideal for structural work and concrete preparations.",
    price: 620,
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    stock: 450
  },
  {
    name: "River Sand - 1 Ton",
    description: "Clean river sand suitable for plastering and concrete work.",
    price: 3500,
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    stock: 100
  },
  {
    name: "Machine Cut Bricks - Red",
    description: "Standard machine cut bricks for wall construction. Quality tested.",
    price: 18,
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400",
    stock: 10000
  },
  {
    name: "Timber - Pine 2x6x12",
    description: "Pressure treated pine timber suitable for framing and structural work.",
    price: 1200,
    category: "Building Materials",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    stock: 200
  },

  // Power Tools
  {
    name: "Bosch Cordless Drill 18V",
    description: "Professional cordless drill with 2 batteries, charger, and carrying case. Variable speed control.",
    price: 8500,
    category: "Power Tools",
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
    stock: 50
  },
  {
    name: "Makita Circular Saw 7.25",
    description: "Powerful 15AMP circular saw with laser guide. Perfect for precision cuts.",
    price: 12500,
    category: "Power Tools",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
    stock: 30
  },
  {
    name: "DeWalt Angle Grinder 4.5",
    description: "Heavy duty angle grinder for cutting and grinding metal and masonry.",
    price: 6800,
    category: "Power Tools",
    image: "https://images.unsplash.com/photo-1566933294831-b334b2293454?w=400",
    stock: 40
  },
  {
    name: "Stanley Jigsaw 500W",
    description: "Variable speed jigsaw with orbital action. Ideal for curved cuts.",
    price: 4500,
    category: "Power Tools",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    stock: 35
  },

  // Hand Tools
  {
    name: "Stanley Claw Hammer 16oz",
    description: "Professional claw hammer with fiberglass handle. Comfortable grip.",
    price: 850,
    category: "Hand Tools",
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400",
    stock: 200
  },
  {
    name: "Set of Screwdrivers - 32 Piece",
    description: "Complete screwdriver set with Phillips, flathead, and Torx drivers. Magnetic tips.",
    price: 2200,
    category: "Hand Tools",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400",
    stock: 150
  },
  {
    name: "King Tony Wrench Set - 12 Piece",
    description: "Combination wrench set (8-19mm). Chrome vanadium steel.",
    price: 3500,
    category: "Hand Tools",
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400",
    stock: 100
  },
  {
    name: "Tajima Tape Measure 7.5m",
    description: "Professional tape measure with magnetic hook and blade brake.",
    price: 1200,
    category: "Hand Tools",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400",
    stock: 180
  },
  {
    name: "Bosch Spirit Level 60cm",
    description: "Aluminum spirit level with 3 vials. Accuracy 0.5mm/m.",
    price: 1800,
    category: "Hand Tools",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400",
    stock: 120
  },

  // Electrical
  {
    name: "Copper Wire - 2.5mm Roll",
    description: "Pure copper electrical wire, 100m roll. Kenya Bureau of Standards approved.",
    price: 4500,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    stock: 300
  },
  {
    name: "Copper Wire - 1.5mm Roll",
    description: "Pure copper electrical wire, 100m roll. For lighting circuits.",
    price: 3200,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    stock: 350
  },
  {
    name: "Extension Socket - 6 Way",
    description: "6-outlet extension with 2m cord and individual switches. 13A fuse.",
    price: 850,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    stock: 250
  },
  {
    name: "LED Bulb - 9W",
    description: "Energy saving LED bulb. E27 base. 800 lumens. 6500K daylight.",
    price: 350,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400",
    stock: 1000
  },
  {
    name: "Circuit Breaker - 32A",
    description: "Mini circuit breaker MCB 32A single pole. For overload protection.",
    price: 450,
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    stock: 400
  },

  // Plumbing
  {
    name: "PVC Pipe - 1 inch (3m)",
    description: "Standard PVC pipe for water supply. Pressure rated.",
    price: 380,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    stock: 500
  },
  {
    name: "PVC Pipe - 2 inch (3m)",
    description: "Standard PVC pipe for drainage. Heavy duty.",
    price: 650,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    stock: 400
  },
  {
    name: "Galvanized Pipe - 1 inch (3m)",
    description: "Galvanized steel pipe for water distribution. Corrosion resistant.",
    price: 1200,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    stock: 200
  },
  {
    name: "Water Tank - 1000L",
    description: "High density polyethylene water tank. Food grade. With lid.",
    price: 8500,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    stock: 50
  },
  {
    name: "Brass Ball Valve - 1 inch",
    description: "Full bore brass ball valve. Threaded ends. For water control.",
    price: 550,
    category: "Plumbing",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    stock: 300
  },

  // Paint
  {
    name: "Dulux Exterior Paint - 20L",
    description: "Premium quality exterior paint. Weather resistant. Washable.",
    price: 4500,
    category: "Paint",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    stock: 150
  },
  {
    name: "Dulux Interior Paint - 20L",
    description: "Premium quality interior paint. Low odor. Easy clean.",
    price: 3800,
    category: "Paint",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    stock: 180
  },
  {
    name: "Metal Primer - 5L",
    description: "Red oxide metal primer. Anti-corrosion protection.",
    price: 1200,
    category: "Paint",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    stock: 100
  },
  {
    name: "Wood Varnish - 5L",
    description: "Clear polyurethane varnish for wood. Gloss finish.",
    price: 2200,
    category: "Paint",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    stock: 80
  },
  {
    name: "Paint Brushes Set - 5 Piece",
    description: "Assorted paint brushes for walls and wood. Various sizes.",
    price: 650,
    category: "Paint",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400",
    stock: 200
  }
];

const seedUsers = [
  {
    name: "Admin User",
    email: "admin@modernhardware.com",
    password: "admin123",
    role: "admin",
    phone: "+254700000000",
    address: "Nairobi, Kenya"
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "user123",
    role: "customer",
    phone: "+254712345678",
    address: "Mombasa, Kenya"
  }
];

function seed() {
  console.log("Seeding database...");

  // Check if products already exist
  const existingProducts = db.prepare("SELECT COUNT(*) as count FROM products").get();
  if (existingProducts.count > 0) {
    console.log("Products already seeded. Skipping...");
  } else {
    // Seed products
    const insertProduct = db.prepare(`
      INSERT INTO products (name, description, price, category, image, stock)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const product of seedProducts) {
      insertProduct.run(
        product.name,
        product.description,
        product.price,
        product.category,
        product.image,
        product.stock
      );
    }
    console.log(`Seeded ${seedProducts.length} products`);
  }

  // Check if users already exist
  const existingUsers = db.prepare("SELECT COUNT(*) as count FROM users").get();
  if (existingUsers.count > 0) {
    console.log("Users already seeded. Skipping...");
  } else {
    // Seed users with hashed passwords
    const seedUsers = [
      {
        name: "Admin User",
        email: "admin@modernhardware.com",
        password: "admin123",
        role: "admin",
        phone: "+254700000000",
        address: "Nairobi, Kenya"
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: "user123",
        role: "customer",
        phone: "+254712345678",
        address: "Mombasa, Kenya"
      }
    ];

    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password, role, phone, address)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const user of seedUsers) {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      insertUser.run(user.name, user.email, hashedPassword, user.role, user.phone, user.address);
    }
    console.log(`Seeded ${seedUsers.length} users`);
  }

  console.log("Database seeding complete!");
}

export default seed;

