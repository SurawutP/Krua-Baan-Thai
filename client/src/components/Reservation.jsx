import { useState } from 'react'

function Reservation() {
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', date: '', time: '', guests: '', notes: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
        } catch (err) {
            console.log('API not available, demo mode')
        }
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setFormData({ name: '', phone: '', email: '', date: '', time: '', guests: '', notes: '' })
    }

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const today = new Date().toISOString().split('T')[0]

    return (
        <section className="reservation" id="reservation">
            <div className="container">
                <div className="reservation-wrapper">
                    <div className="reservation-info">
                        <span className="section-badge light">จองโต๊ะ</span>
                        <h2 className="section-title light">สำรองที่นั่ง<br />ล่วงหน้า</h2>
                        <p>สำรองที่นั่งเพื่อประสบการณ์ที่ดีที่สุด ทีมงานพร้อมให้บริการคุณด้วยความใส่ใจ</p>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <div>
                                    <strong>โทรจอง</strong>
                                    <p>02-123-4567</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">🕐</span>
                                <div>
                                    <strong>เวลาเปิดทำการ</strong>
                                    <p>10:00 - 22:00 น. (ทุกวัน)</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <div>
                                    <strong>ที่ตั้ง</strong>
                                    <p>123 ถ.สุขุมวิท กรุงเทพฯ</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reservation-form-container">
                        {submitted ? (
                            <div className="success-message">
                                <span>✅</span>
                                <h3>จองโต๊ะสำเร็จ!</h3>
                                <p>เราจะติดต่อกลับเพื่อยืนยันการจอง</p>
                            </div>
                        ) : (
                            <form className="reservation-form" onSubmit={handleSubmit}>
                                <h3>กรอกข้อมูลจองโต๊ะ</h3>
                                <div className="form-group">
                                    <label>ชื่อ-นามสกุล</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="กรุณากรอกชื่อ" required />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>เบอร์โทรศัพท์</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="08X-XXX-XXXX" required />
                                    </div>
                                    <div className="form-group">
                                        <label>อีเมล</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>วันที่</label>
                                        <input type="date" name="date" value={formData.date} onChange={handleChange} min={today} required />
                                    </div>
                                    <div className="form-group">
                                        <label>เวลา</label>
                                        <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>จำนวนท่าน</label>
                                    <select name="guests" value={formData.guests} onChange={handleChange} required>
                                        <option value="">เลือกจำนวน</option>
                                        <option value="1">1 ท่าน</option>
                                        <option value="2">2 ท่าน</option>
                                        <option value="3">3 ท่าน</option>
                                        <option value="4">4 ท่าน</option>
                                        <option value="5">5 ท่าน</option>
                                        <option value="6+">มากกว่า 5 ท่าน</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>หมายเหตุ (ถ้ามี)</label>
                                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="ข้อมูลเพิ่มเติม"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">ยืนยันจองโต๊ะ</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reservation
