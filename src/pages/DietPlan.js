import { useState } from 'react';

const plans = {
  vata: {
    name: "Vata Diet Plan", emoji: "🌬️", color: "#E8650A",
    desc: "Warm, moist, and grounding foods to balance Vata's air and space elements.",
    eat: ["Warm soups and stews", "Cooked vegetables", "Sweet fruits (mango, banana)", "Dairy products", "Nuts and seeds", "Rice and wheat", "Warm spices (ginger, cinnamon)", "Warm herbal teas"],
    avoid: ["Raw vegetables", "Cold drinks", "Dry foods", "Crackers and chips", "Bitter foods", "Carbonated drinks"],
    meals: [
      { time: "7:00 AM", meal: "Warm water with ginger", emoji: "☕" },
      { time: "8:00 AM", meal: "Oatmeal with banana and warm milk", emoji: "🥣" },
      { time: "11:00 AM", meal: "Handful of soaked almonds", emoji: "🥜" },
      { time: "1:00 PM", meal: "Rice with dal and cooked vegetables", emoji: "🍚" },
      { time: "4:00 PM", meal: "Warm milk with Ashwagandha", emoji: "🥛" },
      { time: "7:00 PM", meal: "Vegetable soup with whole wheat bread", emoji: "🍲" },
      { time: "9:00 PM", meal: "Warm milk with nutmeg", emoji: "🌙" },
    ]
  },
  pitta: {
    name: "Pitta Diet Plan", emoji: "🔥", color: "#C9973A",
    desc: "Cool, sweet, and hydrating foods to balance Pitta's fire and water elements.",
    eat: ["Sweet fruits (grapes, melon, coconut)", "Cooling vegetables (cucumber, leafy greens)", "Dairy (milk, ghee, butter)", "Basmati rice", "Wheat and oats", "Cooling spices (coriander, fennel)", "Coconut water", "Rose water drinks"],
    avoid: ["Spicy food", "Sour foods", "Fermented foods", "Red meat", "Alcohol", "Excessive salt", "Tomatoes and peppers", "Hot drinks"],
    meals: [
      { time: "7:00 AM", meal: "Coconut water or rose water", emoji: "🥥" },
      { time: "8:00 AM", meal: "Sweet porridge with milk and dates", emoji: "🥣" },
      { time: "11:00 AM", meal: "Fresh coconut and sweet fruits", emoji: "🍇" },
      { time: "1:00 PM", meal: "Basmati rice with cooling vegetables and ghee", emoji: "🍚" },
      { time: "4:00 PM", meal: "Cucumber and mint juice", emoji: "🥒" },
      { time: "7:00 PM", meal: "Light dal with vegetables and chapati", emoji: "🫓" },
      { time: "9:00 PM", meal: "Cold milk with cardamom", emoji: "🥛" },
    ]
  },
  kapha: {
    name: "Kapha Diet Plan", emoji: "💧", color: "#2D6A4F",
    desc: "Light, warm, and stimulating foods to balance Kapha's water and earth elements.",
    eat: ["Light fruits (apples, pears, berries)", "All vegetables (especially bitter ones)", "Legumes and beans", "Millet and barley", "Honey (in small amounts)", "Warm spices (pepper, ginger, turmeric)", "Herbal teas", "Low-fat foods"],
    avoid: ["Dairy products", "Sweet and sour fruits", "Heavy meals", "Fried foods", "Cold foods and drinks", "Wheat and rice in excess", "Sugar", "Red meat"],
    meals: [
      { time: "6:30 AM", meal: "Warm water with lemon and honey", emoji: "🍋" },
      { time: "8:00 AM", meal: "Millet porridge with berries", emoji: "🫐" },
      { time: "11:00 AM", meal: "Apple or pear with ginger tea", emoji: "🍎" },
      { time: "1:00 PM", meal: "Barley with steamed vegetables and lentils", emoji: "🥗" },
      { time: "4:00 PM", meal: "Spiced herbal tea (tulsi, ginger, pepper)", emoji: "🍵" },
      { time: "7:00 PM", meal: "Light vegetable soup with barley", emoji: "🍲" },
      { time: "9:00 PM", meal: "Warm turmeric water", emoji: "🌿" },
    ]
  }
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
  .page{min-height:100vh;background:#0A0A0A;font-family:'Poppins',sans-serif}
  .hero{background:linear-gradient(135deg,#0F1F23,#1A3C2E 60%,#0F2E23);padding:80px 60px 100px;position:relative;overflow:hidden;text-align:center}
  .hero::after{content:'';position:absolute;bottom:-60px;left:0;right:0;height:120px;background:#0A0A0A;clip-path:ellipse(55% 100% at 50% 100%)}
  .hero-tag{display:inline-flex;gap:8px;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:#C9973A;padding:8px 18px;border-radius:30px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:24px}
  .hero-title{font-family:'Playfair Display',serif;font-size:56px;font-weight:900;color:#FDF6EC;line-height:1.1;margin-bottom:20px}
  .hero-title span{color:#C9973A;display:block}
  .hero-sub{color:rgba(253,246,236,.5);font-size:17px;max-width:520px;font-weight:300;margin:0 auto 40px}
  .dosha-selector{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
  .dosha-btn{padding:14px 32px;border-radius:12px;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(255,255,255,.5);font-size:15px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;transition:all .3s;display:flex;align-items:center;gap:8px}
  .dosha-btn.active{color:#fff;transform:translateY(-2px)}
  .dosha-btn:hover:not(.active){border-color:rgba(255,255,255,.25);color:rgba(255,255,255,.8)}
  .main{padding:60px;max-width:1000px;margin:0 auto}
  .plan-header{text-align:center;margin-bottom:48px;animation:slideUp .6s ease-out}
  .plan-emoji{font-size:80px;display:block;margin-bottom:20px;animation:pulse 2.5s ease-in-out infinite}
  .plan-name{font-family:'Playfair Display',serif;font-size:40px;font-weight:900;margin-bottom:12px}
  .plan-desc{color:rgba(255,255,255,.4);font-size:16px;line-height:1.7;max-width:560px;margin:0 auto;font-weight:300}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px}
  .plan-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:26px;animation:slideUp .6s ease-out}
  .card-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:#FDF6EC;margin-bottom:20px}
  .food-list{display:flex;flex-direction:column;gap:8px}
  .food-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;font-size:13px}
  .food-item.eat{background:rgba(34,197,94,.06);border:1px solid rgba(34,197,94,.1);color:rgba(255,255,255,.6)}
  .food-item.avoid{background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.1);color:rgba(255,255,255,.5)}
  .food-check{font-size:14px;font-weight:700;flex-shrink:0}
  .meals-card{background:#111;border:1px solid rgba(255,255,255,.06);border-radius:18px;padding:26px;animation:slideUp .6s ease-out}
  .meal-item{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.04)}
  .meal-item:last-child{border-bottom:none}
  .meal-time{color:#C9973A;font-size:12px;font-weight:700;min-width:70px}
  .meal-emoji{font-size:24px}
  .meal-name{color:rgba(255,255,255,.6);font-size:14px}
  .empty{text-align:center;padding:60px;color:rgba(255,255,255,.2);font-size:16px}
  @media(max-width:768px){.hero{padding:50px 24px 80px}.hero-title{font-size:36px}.main{padding:32px 24px}.two-col{grid-template-columns:1fr}.dosha-selector{flex-direction:column;align-items:center}}
`;

function DietPlan() {
  const [dosha, setDosha] = useState(null);
  const plan = dosha ? plans[dosha] : null;

  return (
    <div className="page">
      <style>{CSS}</style>
      <div className="hero">
        <div className="hero-tag">🥗 Diet Plan</div>
        <h1 className="hero-title">Eat Right for<span>Your Prakriti</span></h1>
        <p className="hero-sub">Get a personalized Ayurvedic diet plan based on your Prakriti body type for optimal health and balance</p>
        <div className="dosha-selector">
          {[{key:'vata',label:'🌬️ Vata',color:'#E8650A'},{key:'pitta',label:'🔥 Pitta',color:'#C9973A'},{key:'kapha',label:'💧 Kapha',color:'#2D6A4F'}].map(d=>(
            <button key={d.key} className={`dosha-btn ${dosha===d.key?'active':''}`} style={dosha===d.key?{background:d.color,borderColor:d.color}:{}} onClick={()=>setDosha(d.key)}>{d.label}</button>
          ))}
        </div>
      </div>
      <div className="main">
        {!plan ? (
          <div className="empty">👆 Select your Prakriti type above to see your diet plan</div>
        ) : (
          <>
            <div className="plan-header">
              <span className="plan-emoji">{plan.emoji}</span>
              <div className="plan-name" style={{color:plan.color}}>{plan.name}</div>
              <div className="plan-desc">{plan.desc}</div>
            </div>
            <div className="two-col">
              <div className="plan-card">
                <div className="card-title">✅ Foods to Eat</div>
                <div className="food-list">
                  {plan.eat.map((f,i)=>(
                    <div key={i} className="food-item eat">
                      <span className="food-check" style={{color:'#22c55e'}}>✓</span>{f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="plan-card">
                <div className="card-title">❌ Foods to Avoid</div>
                <div className="food-list">
                  {plan.avoid.map((f,i)=>(
                    <div key={i} className="food-item avoid">
                      <span className="food-check" style={{color:'#ef4444'}}>✗</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="meals-card">
              <div className="card-title">🕐 Daily Meal Schedule</div>
              {plan.meals.map((m,i)=>(
                <div key={i} className="meal-item">
                  <span className="meal-time">{m.time}</span>
                  <span className="meal-emoji">{m.emoji}</span>
                  <span className="meal-name">{m.meal}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DietPlan;