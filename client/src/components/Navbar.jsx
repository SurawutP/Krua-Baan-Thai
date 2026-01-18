import { useState, useEffect, forwardRef } from 'react'

const Navbar = forwardRef(function Navbar({ cartCount, onCartClick, isBouncing }, cartBtnRef) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <a href="#" className="logo">
                    <span className="logo-icon">🍜</span>
                    <span className="logo-text">ครัวบ้านไทย</span>
                </a>
                <ul className="nav-links">
                    <li><a href="#home">หน้าแรก</a></li>
                    <li><a href="#menu">เมนู</a></li>
                    <li><a href="#about">เกี่ยวกับเรา</a></li>
                    <li><a href="#reservation">จองโต๊ะ</a></li>
                </ul>
                <button
                    ref={cartBtnRef}
                    className={`btn btn-primary cart-btn ${isBouncing ? 'bounce' : ''}`}
                    onClick={onCartClick}
                >
                    🛒 ตะกร้า {cartCount > 0 && <span className={`cart-badge ${isBouncing ? 'pulse' : ''}`}>{cartCount}</span>}
                </button>
            </div>
        </nav>
    )
})

export default Navbar

