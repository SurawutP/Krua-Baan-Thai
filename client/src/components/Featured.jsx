function Featured() {
    const features = [
        { icon: '🍳', title: 'วัตถุดิบสดใหม่', desc: 'คัดสรรวัตถุดิบคุณภาพดีทุกวัน' },
        { icon: '👨‍🍳', title: 'เชฟมืออาชีพ', desc: 'ประสบการณ์กว่า 15 ปี' },
        { icon: '🚗', title: 'จัดส่งถึงบ้าน', desc: 'ส่งฟรีในระยะ 5 กม.' },
        { icon: '💯', title: 'รสชาติต้นตำรับ', desc: 'สูตรดั้งเดิมแท้ๆ' },
    ]

    return (
        <section className="featured">
            <div className="container">
                <div className="featured-grid">
                    {features.map((f, i) => (
                        <div className="featured-item" key={i}>
                            <div className="featured-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Featured
