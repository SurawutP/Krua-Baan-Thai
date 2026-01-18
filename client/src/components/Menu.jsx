import { useState, useRef } from 'react'

function Menu({ items, onAddToCart }) {
    const [activeCategory, setActiveCategory] = useState('all')
    const imageRefs = useRef({})

    const categories = [
        { id: 'all', name: 'ทั้งหมด' },
        { id: 'soup', name: 'ต้ม/แกง' },
        { id: 'fried', name: 'ทอด/ผัด' },
        { id: 'salad', name: 'ยำ/สลัด' },
    ]

    const filteredItems = activeCategory === 'all'
        ? items
        : items.filter(item => item.category === activeCategory)

    const renderSpicy = (level) => '🌶️'.repeat(level)

    const handleAddToCart = (item, e) => {
        const imgEl = imageRefs.current[item.id]
        if (imgEl) {
            const rect = imgEl.getBoundingClientRect()
            onAddToCart(item, {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
                image: item.image
            })
        } else {
            onAddToCart(item, null)
        }

        // Button ripple effect
        e.currentTarget.classList.add('clicked')
        setTimeout(() => e.currentTarget.classList.remove('clicked'), 400)
    }

    return (
        <section className="menu" id="menu">
            <div className="container">
                <div className="section-header center">
                    <span className="section-badge">เมนูแนะนำ</span>
                    <h2 className="section-title">อาหารจานเด็ด</h2>
                    <p className="section-description">เมนูยอดนิยมที่ลูกค้าติดใจ สั่งซ้ำทุกครั้งที่มา</p>
                </div>

                <div className="menu-categories">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {filteredItems.map(item => (
                        <div className="menu-card" key={item.id}>
                            <div className="menu-image">
                                <img
                                    ref={el => imageRefs.current[item.id] = el}
                                    src={item.image}
                                    alt={item.name}
                                />
                                {item.badge && <span className="menu-badge hot">{item.badge}</span>}
                            </div>
                            <div className="menu-content">
                                <div className="menu-header">
                                    <h3>{item.name}</h3>
                                    <span className="spicy-level">{renderSpicy(item.spicy)}</span>
                                </div>
                                <p>{item.description}</p>
                                <div className="menu-footer">
                                    <span className="price">฿ {item.price}</span>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={(e) => handleAddToCart(item, e)}
                                    >
                                        + เพิ่มลงตะกร้า
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Menu

