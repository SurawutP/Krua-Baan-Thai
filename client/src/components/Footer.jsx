function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <a href="#" className="logo">
                            <span className="logo-icon">🍜</span>
                            <span className="logo-text">ครัวบ้านไทย</span>
                        </a>
                        <p>ร้านอาหารไทยแท้ระดับพรีเมียม<br />รสชาติที่คุณจะหลงรัก</p>
                        <div className="social-links">
                            <a href="#" className="social-link">📘</a>
                            <a href="#" className="social-link">📸</a>
                            <a href="#" className="social-link">🐦</a>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>ลิงก์ด่วน</h4>
                        <ul>
                            <li><a href="#home">หน้าแรก</a></li>
                            <li><a href="#menu">เมนู</a></li>
                            <li><a href="#about">เกี่ยวกับเรา</a></li>
                            <li><a href="#reservation">จองโต๊ะ</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>เวลาเปิดทำการ</h4>
                        <ul className="hours">
                            <li><span>จันทร์ - ศุกร์</span><span>10:00 - 22:00</span></li>
                            <li><span>เสาร์ - อาทิตย์</span><span>09:00 - 23:00</span></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>ติดต่อเรา</h4>
                        <ul className="contact-list">
                            <li>📍 123 ถ.สุขุมวิท กรุงเทพฯ</li>
                            <li>📞 02-123-4567</li>
                            <li>📧 info@kruabanthai.com</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 ครัวบ้านไทย. สงวนลิขสิทธิ์.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
