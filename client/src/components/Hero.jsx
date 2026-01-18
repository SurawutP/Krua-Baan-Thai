function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <span className="hero-badge">✦ PREMIUM THAI CUISINE ✦</span>
                <h1 className="hero-title">
                    รสชาติที่คุณ<br />
                    <span className="gradient-text">จะหลงรัก</span>
                </h1>
                <p className="hero-description">
                    สัมผัสประสบการณ์อาหารไทยแท้ระดับพรีเมียม รสชาติต้นตำรับจากเชฟมือฉมัง
                    วัตถุดิบสดใหม่ทุกวัน พร้อมบรรยากาศหรูหราเหนือระดับ
                </p>
                <div className="hero-buttons">
                    <a href="#menu" className="btn btn-primary btn-lg">
                        ดูเมนู →
                    </a>
                    <a href="#about" className="btn btn-outline btn-lg">เกี่ยวกับเรา</a>
                </div>
                <div className="hero-stats">
                    <div className="stat">
                        <span className="stat-number">15+</span>
                        <span className="stat-label">ปีประสบการณ์</span>
                    </div>
                    <div className="stat">
                        <span className="stat-number">50+</span>
                        <span className="stat-label">เมนูอาหาร</span>
                    </div>
                    <div className="stat">
                        <span className="stat-number">10K+</span>
                        <span className="stat-label">ลูกค้าประทับใจ</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
