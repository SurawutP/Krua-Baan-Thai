

CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    spicy INT DEFAULT 1,
    image VARCHAR(500),
    badge VARCHAR(50),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(200) NOT NULL,
    email VARCHAR(200),
    phone VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests VARCHAR(20) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(200),
    phone VARCHAR(20),
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'preparing', 'ready', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);


INSERT INTO categories (name, description) VALUES
('soup', 'ต้ม/แกง'),
('fried', 'ทอด/ผัด'),
('salad', 'ยำ/สลัด');


INSERT INTO menu_items (name, description, price, category, spicy, image, badge) VALUES
('ต้มยำกุ้งน้ำข้น', 'ต้มยำกุ้งแม่น้ำตัวใหญ่ น้ำข้นเข้มข้น รสจัดจ้าน', 350.00, 'soup', 3, 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop', 'ขายดี'),
('ปลากระพงทอดน้ำปลา', 'ปลากระพงทอดกรอบนอกนุ่มใน ราดน้ำปลาสูตรเด็ด', 450.00, 'fried', 1, 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', 'แนะนำ'),
('ผัดกะเพราหมูกรอบ', 'หมูกรอบผัดกะเพราใบโหระพาสด ไข่ดาวกรอบ', 120.00, 'fried', 2, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop', NULL),
('แกงเขียวหวานไก่', 'แกงเขียวหวานกะทิแท้ เนื้อไก่นุ่ม มะเขือพวง', 180.00, 'soup', 2, 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&h=300&fit=crop', NULL),
('ส้มตำไทย', 'ส้มตำมะละกอสด รสเปรี้ยว เผ็ด หวาน กลมกล่อม', 80.00, 'salad', 3, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', 'ขายดี'),
('ยำวุ้นเส้นทะเล', 'วุ้นเส้นยำกับซีฟู้ดสดใหม่ รสจัดจ้าน', 220.00, 'salad', 2, 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop', NULL),
('ข้าวผัดปู', 'ข้าวผัดเนื้อปูก้อนโต หอมน้ำมันกุ้งเผา', 280.00, 'fried', 1, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', NULL),
('ต้มข่าไก่', 'ซุปกะทิสมุนไพร เนื้อไก่นุ่ม รสเข้มข้น', 160.00, 'soup', 1, 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=300&fit=crop', NULL);
