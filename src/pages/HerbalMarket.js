import { useState } from 'react';

const products = [
  { id: 1, name: "अश्वगंधा मुळाची पावडर", category: "तणाव व झोप", price: 299, originalPrice: 399, rating: 4.8, reviews: 234, emoji: "🌿", badge: "सर्वाधिक विक्री", desc: "तणाव कमी करण्यासाठी आणि चांगल्या झोपेसाठी उत्कृष्ट दर्जाची अश्वगंधा" },

  { id: 2, name: "त्रिफळा चूर्ण", category: "पचन", price: 199, originalPrice: 249, rating: 4.7, reviews: 189, emoji: "🍃", badge: "लोकप्रिय", desc: "पचन सुधारण्यासाठी आणि शरीर शुद्धीकरणासाठी पारंपरिक आयुर्वेदिक मिश्रण" },

  { id: 3, name: "ब्राह्मी कॅप्सूल", category: "मेंदू व स्मरणशक्ती", price: 349, originalPrice: 449, rating: 4.9, reviews: 312, emoji: "🧠", badge: "उच्च दर्जा", desc: "स्मरणशक्ती, एकाग्रता आणि मेंदूची कार्यक्षमता नैसर्गिकरित्या वाढवा" },

  { id: 4, name: "कडुनिंब गोळ्या", category: "त्वचा व रक्त", price: 149, originalPrice: 199, rating: 4.6, reviews: 156, emoji: "🌱", badge: null, desc: "शुद्ध कडुनिंबामुळे रक्तशुद्धी आणि त्वचेचे आरोग्य सुधारते" },

  { id: 5, name: "हळद + काळी मिरी", category: "रोगप्रतिकारक शक्ती", price: 249, originalPrice: 299, rating: 4.8, reviews: 278, emoji: "🟡", badge: "नवीन", desc: "उत्तम शोषणासह सुवर्ण रोगप्रतिकारक शक्ती वाढवणारे मिश्रण" },

  { id: 6, name: "च्यवनप्राश", category: "रोगप्रतिकारक शक्ती", price: 399, originalPrice: 499, rating: 4.9, reviews: 445, emoji: "🫙", badge: "सर्वाधिक विक्री", desc: "४० हून अधिक औषधी वनस्पतींनी समृद्ध पारंपरिक आयुर्वेदिक च्यवनप्राश" },

  { id: 7, name: "शतावरी पावडर", category: "महिला आरोग्य", price: 299, originalPrice: 379, rating: 4.7, reviews: 198, emoji: "🌸", badge: "लोकप्रिय", desc: "महिलांच्या हार्मोनल संतुलनासाठी नैसर्गिक सहाय्य" },

  { id: 8, name: "गिलोय रस", category: "रोगप्रतिकारक शक्ती", price: 179, originalPrice: 229, rating: 4.6, reviews: 167, emoji: "🍀", badge: null, desc: "रोगप्रतिकारक शक्ती वाढवणारा आणि ताप कमी करण्यास मदत करणारा गिलोय रस" },
];

const categories = ["All", "Immunity", "Digestion", "Brain & Memory", "Stress & Sleep", "Skin & Blood", "Women Health"];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes bounce { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }

  .market-page { min-height: 100vh; background: #0A0A0A; font-family: 'Poppins', sans-serif; }

  .market-hero { background: linear-gradient(135deg, #0F1F23 0%, #1A3C2E 60%, #0F2E23 100%); padding: 80px 60px 100px; position: relative; overflow: hidden; }
  .market-hero::before { content: '🛒'; position: absolute; right: 40px; top: 0; font-size: 280px; opacity: 0.04; animation: float 8s ease-in-out infinite; }
  .market-hero::after { content: ''; position: absolute; bottom: -60px; left: 0; right: 0; height: 120px; background: #0A0A0A; clip-path: ellipse(55% 100% at 50% 100%); }

  .hero-tag { display: inline-flex; gap: 8px; background: rgba(201,151,58,0.15); border: 1px solid rgba(201,151,58,0.3); color: #C9973A; padding: 8px 18px; border-radius: 30px; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 24px; }
  .hero-title { font-family: 'Playfair Display', serif; font-size: 64px; font-weight: 900; color: #FDF6EC; line-height: 1.1; margin-bottom: 20px; }
  .hero-title span { color: #C9973A; display: block; }
  .hero-sub { color: rgba(253,246,236,0.5); font-size: 18px; line-height: 1.7; max-width: 520px; font-weight: 300; margin-bottom: 40px; }

  .search-row { display: flex; gap: 12px; max-width: 600px; }
  .search-input { flex: 1; padding: 16px 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; font-size: 15px; color: #FDF6EC; outline: none; font-family: 'Poppins', sans-serif; }
  .search-input::placeholder { color: rgba(255,255,255,0.25); }
  .search-input:focus { border-color: #E8650A; }

  .market-bar { background: #111; padding: 16px 60px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); position: sticky; top: 0; z-index: 100; }
  .bar-count { color: rgba(255,255,255,0.3); font-size: 14px; }
  .cart-btn { background: rgba(232,101,10,0.1); color: #E8650A; border: 1px solid rgba(232,101,10,0.3); padding: 10px 24px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-family: 'Poppins', sans-serif; transition: all 0.2s; }
  .cart-btn:hover { background: #E8650A; color: white; }
  .cart-count { background: #E8650A; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; animation: bounce 0.3s ease-out; }

  .filters-bar { background: #0F0F0F; padding: 16px 60px; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; gap: 10px; flex-wrap: wrap; }
  .filter-pill { padding: 8px 18px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: rgba(255,255,255,0.35); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .filter-pill.active { background: #E8650A; color: white; border-color: #E8650A; }
  .filter-pill:hover:not(.active) { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.7); }

  .products-section { padding: 48px 60px; }
  .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

  .product-card { background: #111; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; overflow: hidden; transition: all 0.35s; animation: slideUp 0.6s ease-out; }
  .product-card:hover { transform: translateY(-6px); border-color: rgba(255,255,255,0.12); box-shadow: 0 24px 60px rgba(0,0,0,0.5); }

  .product-image { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 72px; position: relative; background: linear-gradient(135deg, #1A3C2E22, #2D6A4F22); }
  .product-badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; }
  .badge-bestseller { background: rgba(232,101,10,0.2); color: #E8650A; border: 1px solid rgba(232,101,10,0.3); }
  .badge-popular { background: rgba(201,151,58,0.2); color: #C9973A; border: 1px solid rgba(201,151,58,0.3); }
  .badge-new { background: rgba(45,106,79,0.2); color: #2D6A4F; border: 1px solid rgba(45,106,79,0.3); }
  .badge-toprated { background: rgba(26,60,46,0.4); color: #FDF6EC; border: 1px solid rgba(255,255,255,0.1); }

  .product-body { padding: 20px; }
  .product-cat { color: #C9973A; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 6px; }
  .product-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #FDF6EC; margin-bottom: 8px; line-height: 1.3; }
  .product-desc { color: rgba(255,255,255,0.3); font-size: 13px; line-height: 1.6; margin-bottom: 14px; }
  .product-rating { color: rgba(255,255,255,0.3); font-size: 12px; margin-bottom: 16px; }

  .product-footer { display: flex; align-items: center; justify-content: space-between; }
  .price-wrap { }
  .price-current { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #FDF6EC; }
  .price-original { font-size: 13px; color: rgba(255,255,255,0.2); text-decoration: line-through; margin-left: 6px; }
  .add-btn { padding: 10px 18px; border-radius: 10px; border: none; font-size: 13px; font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'Poppins', sans-serif; }
  .add-btn.normal { background: rgba(232,101,10,0.1); color: #E8650A; border: 1px solid rgba(232,101,10,0.3); }
  .add-btn.normal:hover { background: #E8650A; color: white; }
  .add-btn.added { background: rgba(45,106,79,0.2); color: #2D6A4F; border: 1px solid rgba(45,106,79,0.3); }

  @media (max-width: 768px) {
    .market-hero { padding: 50px 24px 80px; }
    .hero-title { font-size: 40px; }
    .market-bar { padding: 16px 24px; }
    .filters-bar { padding: 16px 24px; }
    .products-section { padding: 32px 24px; }
    .products-grid { grid-template-columns: 1fr 1fr; }
  }
`;

function HerbalMarket() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [cart, setCart] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'All' || p.category === selectedCat;
    return matchSearch && matchCat;
  });

  const addToCart = (product) => {
    setCart([...cart, product]);
    setAddedItems([...addedItems, product.id]);
    setTimeout(() => setAddedItems(prev => prev.filter(id => id !== product.id)), 2000);
  };

  const getBadgeClass = (badge) => {
    if (!badge) return '';
    const map = {
      'Bestseller': 'bestseller', 'सर्वाधिक विक्री': 'bestseller',
      'Popular': 'popular', 'लोकप्रिय': 'popular',
      'New': 'new', 'नवीन': 'new',
      'Top Rated': 'toprated', 'उच्च दर्जा': 'toprated'
    };
    return `badge-${map[badge] || ''}`;
  };

  return (
    <div className="market-page">
      <style>{CSS}</style>

      <div className="market-hero">
        <div className="hero-tag">🌿 Ayurvedic Store</div>
        <h1 className="hero-title">Herbal<span>Marketplace</span></h1>
        <p className="hero-sub">100% natural, certified Ayurvedic products delivered to your door</p>
        <div className="search-row">
          <input className="search-input" type="text" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="market-bar">
        <span className="bar-count">Showing {filtered.length} products</span>
        <button className="cart-btn">
          🛒 Cart {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>
      </div>

      <div className="filters-bar">
        {categories.map(cat => (
          <button key={cat} className={`filter-pill ${selectedCat === cat ? 'active' : ''}`} onClick={() => setSelectedCat(cat)}>{cat}</button>
        ))}
      </div>

      <div className="products-section">
        <div className="products-grid">
          {filtered.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.badge && <div className={`product-badge ${getBadgeClass(product.badge)}`}>{product.badge}</div>}
                <span>{product.emoji}</span>
              </div>
              <div className="product-body">
                <div className="product-cat">{product.category}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-desc">{product.desc}</div>
                <div className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</div>
                <div className="product-footer">
                  <div className="price-wrap">
                    <span className="price-current">₹{product.price}</span>
                    <span className="price-original">₹{product.originalPrice}</span>
                  </div>
                  <button className={`add-btn ${addedItems.includes(product.id) ? 'added' : 'normal'}`} onClick={() => addToCart(product)}>
                    {addedItems.includes(product.id) ? '✓ Added!' : '+ Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HerbalMarket;