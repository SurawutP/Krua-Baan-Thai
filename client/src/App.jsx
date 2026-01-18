import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Menu from './components/Menu'
import About from './components/About'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import Cart from './components/Cart'

function App() {
    const [cart, setCart] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [menuItems, setMenuItems] = useState([])
    const [flyingItems, setFlyingItems] = useState([])
    const [isBouncing, setIsBouncing] = useState(false)
    const cartBtnRef = useRef(null)

    useEffect(() => {
        // Fetch menu from API
        fetch('/api/menu')
            .then(res => res.json())
            .then(data => setMenuItems(data))
            .catch(() => {
                // Fallback data if API not available
                setMenuItems([
                    { id: 1, name: 'ต้มยำกุ้งน้ำข้น', description: 'ต้มยำกุ้งแม่น้ำตัวใหญ่ น้ำข้นเข้มข้น รสจัดจ้าน', price: 350, category: 'soup', spicy: 3, image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=400&h=300&fit=crop', badge: 'ขายดี' },
                    { id: 2, name: 'ปลากระพงทอดน้ำปลา', description: 'ปลากระพงทอดกรอบนอกนุ่มใน ราดน้ำปลาสูตรเด็ด', price: 450, category: 'fried', spicy: 1, image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop', badge: 'แนะนำ' },
                    { id: 3, name: 'ผัดกะเพราหมูกรอบ', description: 'หมูกรอบผัดกะเพราใบโหระพาสด ไข่ดาวกรอบ', price: 120, category: 'fried', spicy: 2, image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop' },
                    { id: 4, name: 'แกงเขียวหวานไก่', description: 'แกงเขียวหวานกะทิแท้ เนื้อไก่นุ่ม มะเขือพวง', price: 180, category: 'soup', spicy: 2, image: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&h=300&fit=crop' },
                    { id: 5, name: 'ส้มตำไทย', description: 'ส้มตำมะละกอสด รสเปรี้ยว เผ็ด หวาน กลมกล่อม', price: 80, category: 'salad', spicy: 3, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop', badge: 'ขายดี' },
                    { id: 6, name: 'ยำวุ้นเส้นทะเล', description: 'วุ้นเส้นยำกับซีฟู้ดสดใหม่ รสจัดจ้าน', price: 220, category: 'salad', spicy: 2, image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400&h=300&fit=crop' },
                ])
            })
    }, [])

    const addToCart = (item, imageInfo) => {
        // Add flying animation if we have image position
        if (imageInfo && cartBtnRef.current) {
            const cartRect = cartBtnRef.current.getBoundingClientRect()
            const targetX = cartRect.left + cartRect.width / 2
            const targetY = cartRect.top + cartRect.height / 2

            const flyingId = Date.now()
            setFlyingItems(prev => [...prev, {
                id: flyingId,
                image: imageInfo.image,
                startX: imageInfo.x,
                startY: imageInfo.y,
                endX: targetX,
                endY: targetY
            }])

            // Remove flying item and trigger bounce after animation
            setTimeout(() => {
                setFlyingItems(prev => prev.filter(f => f.id !== flyingId))
                setIsBouncing(true)
                setTimeout(() => setIsBouncing(false), 600)
            }, 800)
        }

        setCart(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id)
            return
        }
        setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <div className="app">
            <Navbar
                ref={cartBtnRef}
                cartCount={cartCount}
                onCartClick={() => setIsCartOpen(true)}
                isBouncing={isBouncing}
            />
            <Hero />
            <Featured />
            <Menu items={menuItems} onAddToCart={addToCart} />
            <About />
            <Reservation />
            <Footer />
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart}
                total={cartTotal}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
            />

            {/* Flying Images */}
            {flyingItems.map(item => (
                <img
                    key={item.id}
                    src={item.image}
                    alt="flying"
                    className="flying-image"
                    style={{
                        left: item.startX - 40,
                        top: item.startY - 40,
                        '--end-x': `${item.endX - item.startX}px`,
                        '--end-y': `${item.endY - item.startY}px`
                    }}
                />
            ))}
        </div>
    )
}

export default App

