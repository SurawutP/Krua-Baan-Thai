function Cart({ isOpen, onClose, items, total, onUpdateQuantity, onRemove }) {
    if (!isOpen) return null

    return (
        <>
            <div className="cart-overlay" onClick={onClose}></div>
            <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>🛒 ตะกร้าของคุณ</h2>
                    <button className="cart-close" onClick={onClose}>✕</button>
                </div>

                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <span className="cart-empty-icon">🍽️</span>
                            <p>ยังไม่มีรายการในตะกร้า</p>
                            <button className="btn btn-outline" onClick={onClose}>เลือกเมนู</button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <span className="cart-item-price">฿ {item.price}</span>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => onRemove(item.id)}>🗑️</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>รวมทั้งหมด</span>
                            <span className="total-price">฿ {total.toLocaleString()}</span>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block">
                            สั่งอาหาร →
                        </button>
                        <p className="cart-note">* ราคายังไม่รวมค่าจัดส่ง</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Cart
