function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-images">
                        <div className="about-img-1">
                            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=600&fit=crop" alt="บรรยากาศร้าน" />
                        </div>
                        <div className="about-img-2">
                            <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=300&h=300&fit=crop" alt="อาหาร" />
                        </div>
                        <div className="experience-badge">
                            <span className="exp-number">15</span>
                            <span className="exp-text">ปี<br />ประสบการณ์</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <span className="section-badge">เกี่ยวกับเรา</span>
                        <h2 className="section-title">เรื่องราวของ<br /><span className="gradient-text">ครัวบ้านไทย</span></h2>
                        <p className="about-text">
                            ก่อตั้งขึ้นเมื่อปี 2553 ด้วยความรักในอาหารไทยและความตั้งใจที่จะส่งต่อรสชาติแท้ๆ
                            จากครัวบ้านสู่โต๊ะอาหารของคุณ เราคัดสรรวัตถุดิบสดใหม่ทุกวัน
                            ปรุงด้วยสูตรดั้งเดิมที่สืบทอดมากว่า 3 รุ่น
                        </p>
                        <ul className="about-features">
                            <li>
                                <span className="feature-icon">✓</span>
                                <span>วัตถุดิบสดใหม่ คัดสรรทุกวัน</span>
                            </li>
                            <li>
                                <span className="feature-icon">✓</span>
                                <span>สูตรดั้งเดิม สืบทอด 3 รุ่น</span>
                            </li>
                            <li>
                                <span className="feature-icon">✓</span>
                                <span>ไม่ใส่ผงชูรส ปลอดภัยต่อสุขภาพ</span>
                            </li>
                            <li>
                                <span className="feature-icon">✓</span>
                                <span>บรรยากาศหรูหรา ระดับพรีเมียม</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
