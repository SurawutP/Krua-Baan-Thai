import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
let db = null

async function connectDB() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'restaurant_db'
        })
        console.log('✅ Connected to MySQL database')

        // Initialize tables
        await initializeTables()
    } catch (err) {
        console.log('⚠️ MySQL not connected, using demo data')
        console.log('   Run: mysql -u root -p < database/schema.sql')
    }
}

async function initializeTables() {
    if (!db) return

    // Create tables if not exist
    await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL
    )
  `)

    await db.execute(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(50),
      spicy INT DEFAULT 1,
      image VARCHAR(500),
      badge VARCHAR(50)
    )
  `)

    await db.execute(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      customer_name VARCHAR(200) NOT NULL,
      email VARCHAR(200),
      phone VARCHAR(20) NOT NULL,
      date DATE NOT NULL,
      time TIME NOT NULL,
      guests VARCHAR(20) NOT NULL,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

    // Check if menu items exist, if not seed them
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM menu_items')
    if (rows[0].count === 0) {
        await seedMenuItems()
    }
}

async function seedMenuItems() {
    if (!db) return

    const items = [
        ['ต้มยำกุ้งน้ำข้น', 'ต้มยำกุ้งแม่น้ำตัวใหญ่ น้ำข้นเข้มข้น รสจัดจ้าน', 350, 'soup', 3, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop', 'ขายดี'],
        ['ปลากระพงทอดน้ำปลา', 'ปลากระพงทอดกรอบนอกนุ่มใน ราดน้ำปลาสูตรเด็ด', 450, 'fried', 1, 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', 'แนะนำ'],
        ['ผัดกะเพราหมูกรอบ', 'หมูกรอบผัดกะเพราใบโหระพาสด ไข่ดาวกรอบ', 120, 'fried', 2, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop', null],
        ['แกงเขียวหวานไก่', 'แกงเขียวหวานกะทิแท้ เนื้อไก่นุ่ม มะเขือพวง', 180, 'soup', 2, 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&h=300&fit=crop', null],
        ['ส้มตำไทย', 'ส้มตำมะละกอสด รสเปรี้ยว เผ็ด หวาน กลมกล่อม', 80, 'salad', 3, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', 'ขายดี'],
        ['ยำวุ้นเส้นทะเล', 'วุ้นเส้นยำกับซีฟู้ดสดใหม่ รสจัดจ้าน', 220, 'salad', 2, 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop', null]
    ]

    for (const item of items) {
        await db.execute(
            'INSERT INTO menu_items (name, description, price, category, spicy, image, badge) VALUES (?, ?, ?, ?, ?, ?, ?)',
            item
        )
    }
    console.log('✅ Seeded menu items')
}

// Demo data (used when MySQL is not connected)
const demoMenuItems = [
    { id: 1, name: 'ต้มยำกุ้งน้ำข้น', description: 'ต้มยำกุ้งแม่น้ำตัวใหญ่ น้ำข้นเข้มข้น รสจัดจ้าน', price: 350, category: 'soup', spicy: 3, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop', badge: 'ขายดี' },
    { id: 2, name: 'ปลากระพงทอดน้ำปลา', description: 'ปลากระพงทอดกรอบนอกนุ่มใน ราดน้ำปลาสูตรเด็ด', price: 450, category: 'fried', spicy: 1, image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', badge: 'แนะนำ' },
    { id: 3, name: 'ผัดกะเพราหมูกรอบ', description: 'หมูกรอบผัดกะเพราใบโหระพาสด ไข่ดาวกรอบ', price: 120, category: 'fried', spicy: 2, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop' },
    { id: 4, name: 'แกงเขียวหวานไก่', description: 'แกงเขียวหวานกะทิแท้ เนื้อไก่นุ่ม มะเขือพวง', price: 180, category: 'soup', spicy: 2, image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&h=300&fit=crop' },
    { id: 5, name: 'ส้มตำไทย', description: 'ส้มตำมะละกอสด รสเปรี้ยว เผ็ด หวาน กลมกล่อม', price: 80, category: 'salad', spicy: 3, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', badge: 'ขายดี' },
    { id: 6, name: 'ยำวุ้นเส้นทะเล', description: 'วุ้นเส้นยำกับซีฟู้ดสดใหม่ รสจัดจ้าน', price: 220, category: 'salad', spicy: 2, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop' }
]

const demoReservations = []

// ===== API Routes =====

// Get all menu items
app.get('/api/menu', async (req, res) => {
    try {
        if (db) {
            const [rows] = await db.execute('SELECT * FROM menu_items ORDER BY id')
            res.json(rows)
        } else {
            res.json(demoMenuItems)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get menu by category
app.get('/api/menu/:category', async (req, res) => {
    try {
        const { category } = req.params
        if (db) {
            const [rows] = await db.execute('SELECT * FROM menu_items WHERE category = ?', [category])
            res.json(rows)
        } else {
            res.json(demoMenuItems.filter(item => item.category === category))
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Create reservation
app.post('/api/reservations', async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, notes } = req.body

        if (db) {
            const [result] = await db.execute(
                'INSERT INTO reservations (customer_name, email, phone, date, time, guests, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, email, phone, date, time, guests, notes]
            )
            res.json({ success: true, id: result.insertId })
        } else {
            const newReservation = { id: demoReservations.length + 1, name, email, phone, date, time, guests, notes, created_at: new Date() }
            demoReservations.push(newReservation)
            res.json({ success: true, id: newReservation.id })
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Get all reservations (for admin)
app.get('/api/reservations', async (req, res) => {
    try {
        if (db) {
            const [rows] = await db.execute('SELECT * FROM reservations ORDER BY created_at DESC')
            res.json(rows)
        } else {
            res.json(demoReservations)
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: db ? 'connected' : 'demo mode' })
})

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`
🍜 ครัวบ้านไทย Server is running!
   
   API Endpoints:
   - GET  /api/menu          - Get all menu items
   - GET  /api/menu/:category - Get menu by category
   - POST /api/reservations  - Create reservation
   - GET  /api/reservations  - Get all reservations
   - GET  /api/health        - Health check

   Server: http://localhost:${PORT}
    `)
    })
})
