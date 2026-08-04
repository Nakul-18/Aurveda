import { useState, createContext } from 'react';

export const LangContext = createContext();

const translations = {
  en: {
    name: "English",
    flag: "🇬🇧",
    nav: { doctors: "Doctors", ayurveda: "Ayurveda", yoga: "Yoga", wellness: "Wellness", tourism: "Tourism", shop: "Shop", symptoms: "Symptoms", dashboard: "Dashboard", getStarted: "Get Started" },
    hero: { tag: "🌿 Ancient Wisdom · Modern Care", line1: "Heal with", line2: "Ayurveda", line3: "& Wellness", sub: "Connect with certified Vaidyas, discover your Prakriti body type, and begin your journey to complete mind-body-soul wellness — from home.", btn1: "Book a Consultation", btn2: "Take Prakriti Quiz →" },
    stats: [["12K+","Patients"],["850+","Vaidyas"],["22","Languages"],["4.9★","Rating"]],
    services: { tag: "All Modules", title1: "Complete", title2: "Wellness,", title3: "One Platform", sub: "Click any module to explore — all 12 modules built and ready to use." },
    why: { tag: "Why ĀrogyaMed", title1: "Built for", title2: "India's Wellness" },
    whyCards: [
      {i:"🗣️",t:"22 Indian Languages",d:"Consult in Hindi, Marathi, Tamil, Telugu and 18 more regional languages via BHASHINI."},
      {i:"🔒",t:"HIPAA Compliant",d:"Your health data is encrypted and secure with AES-256 encryption and TLS 1.3."},
      {i:"⚡",t:"Instant Prescriptions",d:"Receive digital Ayurvedic e-prescriptions immediately after your consultation."},
      {i:"🌍",t:"Medical Tourism",d:"Connect with top wellness centers and hospitals across India for holistic treatment."},
    ],
    process: { tag: "How It Works", title1: "Start in", title2: "4 Simple Steps" },
    processSteps: [
      {n:"01",i:"📱",t:"Create Account",d:"Sign up with your phone number and complete your health profile in minutes."},
      {n:"02",i:"🌿",t:"Take Prakriti Quiz",d:"Answer 10 questions to discover your unique Ayurvedic body type."},
      {n:"03",i:"🩺",t:"Choose a Vaidya",d:"Browse certified doctors by specialization, language and availability."},
      {n:"04",i:"✨",t:"Begin Healing",d:"Attend your consultation and receive your personalized treatment plan."},
    ],
    cta: { eyebrow: "Begin Today", title1: "Your Path to", title2: "Wellness", title3: "Starts Here", sub: "Join 12,000+ patients who found balance through Ayurveda", btn: "Begin Your Journey — It's Free" },
    footer: { copy: "© 2026 ĀrogyaMed · Made with 🌿 for India" },
  },
  hi: {
    name: "हिंदी",
    flag: "🇮🇳",
    nav: { doctors: "डॉक्टर", ayurveda: "आयुर्वेद", yoga: "योग", wellness: "स्वास्थ्य", tourism: "पर्यटन", shop: "दुकान", symptoms: "लक्षण", dashboard: "डैशबोर्ड", getStarted: "शुरू करें" },
    hero: { tag: "🌿 प्राचीन ज्ञान · आधुनिक देखभाल", line1: "ठीक हों", line2: "आयुर्वेद", line3: "से", sub: "प्रमाणित वैद्यों से जुड़ें, अपनी प्रकृति जानें, और घर से ही अपनी स्वास्थ्य यात्रा शुरू करें।", btn1: "परामर्श बुक करें", btn2: "प्रकृति परीक्षण लें →" },
    stats: [["12K+","मरीज़"],["850+","वैद्य"],["22","भाषाएं"],["4.9★","रेटिंग"]],
    services: { tag: "सभी मॉड्यूल", title1: "संपूर्ण", title2: "स्वास्थ्य,", title3: "एक प्लेटफ़ॉर्म", sub: "किसी भी मॉड्यूल पर क्लिक करें — सभी 12 मॉड्यूल बने हैं।" },
    why: { tag: "क्यों ĀrogyaMed", title1: "भारत के", title2: "स्वास्थ्य के लिए" },
    whyCards: [
      {i:"🗣️",t:"22 भारतीय भाषाएं",d:"हिंदी, मराठी, तमिल, तेलुगु और 18 अन्य भाषाओं में परामर्श करें।"},
      {i:"🔒",t:"सुरक्षित डेटा",d:"आपका स्वास्थ्य डेटा AES-256 एन्क्रिप्शन से सुरक्षित है।"},
      {i:"⚡",t:"तत्काल नुस्खे",d:"परामर्श के तुरंत बाद डिजिटल आयुर्वेदिक नुस्खे प्राप्त करें।"},
      {i:"🌍",t:"मेडिकल टूरिज्म",d:"भारत के शीर्ष वेलनेस केंद्रों से जुड़ें।"},
    ],
    process: { tag: "कैसे काम करता है", title1: "शुरू करें", title2: "4 आसान चरणों में" },
    processSteps: [
      {n:"01",i:"📱",t:"अकाउंट बनाएं",d:"अपने फ़ोन नंबर से साइन अप करें और स्वास्थ्य प्रोफ़ाइल पूरी करें।"},
      {n:"02",i:"🌿",t:"प्रकृति परीक्षण लें",d:"10 प्रश्नों का उत्तर देकर अपनी आयुर्वेदिक प्रकृति जानें।"},
      {n:"03",i:"🩺",t:"वैद्य चुनें",d:"विशेषज्ञता, भाषा और उपलब्धता के अनुसार डॉक्टर खोजें।"},
      {n:"04",i:"✨",t:"उपचार शुरू करें",d:"परामर्श में भाग लें और व्यक्तिगत उपचार योजना प्राप्त करें।"},
    ],
    cta: { eyebrow: "आज शुरू करें", title1: "आपका रास्ता", title2: "स्वास्थ्य", title3: "यहाँ से शुरू होता है", sub: "12,000+ मरीज़ों से जुड़ें जिन्होंने आयुर्वेद से संतुलन पाया", btn: "अपनी यात्रा शुरू करें — मुफ़्त" },
    footer: { copy: "© 2026 ĀrogyaMed · भारत के स्वास्थ्य के लिए 🌿" },
  },
  mr: {
    name: "मराठी",
    flag: "🇮🇳",
    nav: { doctors: "डॉक्टर", ayurveda: "आयुर्वेद", yoga: "योग", wellness: "आरोग्य", tourism: "पर्यटन", shop: "दुकान", symptoms: "लक्षणे", dashboard: "डॅशबोर्ड", getStarted: "सुरू करा" },
    hero: { tag: "🌿 प्राचीन ज्ञान · आधुनिक काळजी", line1: "बरे व्हा", line2: "आयुर्वेदाने", line3: "आणि योगाने", sub: "प्रमाणित वैद्यांशी जोडा, तुमची प्रकृती जाणून घ्या, आणि घरून संपूर्ण आरोग्य प्रवास सुरू करा।", btn1: "सल्लामसलत बुक करा", btn2: "प्रकृती चाचणी घ्या →" },
    stats: [["12K+","रुग्ण"],["850+","वैद्य"],["22","भाषा"],["4.9★","रेटिंग"]],
    services: { tag: "सर्व मॉड्यूल", title1: "संपूर्ण", title2: "आरोग्य,", title3: "एक प्लॅटफॉर्म", sub: "कोणत्याही मॉड्यूलवर क्लिक करा — सर्व 12 मॉड्यूल तयार आहेत।" },
    why: { tag: "का ĀrogyaMed", title1: "भारताच्या", title2: "आरोग्यासाठी" },
    whyCards: [
      {i:"🗣️",t:"22 भारतीय भाषा",d:"हिंदी, मराठी, तमिळ, तेलुगू आणि 18 इतर भाषांमध्ये सल्लामसलत करा।"},
      {i:"🔒",t:"सुरक्षित डेटा",d:"तुमचा आरोग्य डेटा AES-256 एन्क्रिप्शनने सुरक्षित आहे।"},
      {i:"⚡",t:"त्वरित प्रिस्क्रिप्शन",d:"सल्लामसलतीनंतर लगेच डिजिटल आयुर्वेदिक प्रिस्क्रिप्शन मिळवा।"},
      {i:"🌍",t:"वैद्यकीय पर्यटन",d:"भारतातील शीर्ष वेलनेस केंद्रांशी जोडा।"},
    ],
    process: { tag: "कसे काम करते", title1: "सुरू करा", title2: "4 सोप्या चरणांमध्ये" },
    processSteps: [
      {n:"01",i:"📱",t:"खाते तयार करा",d:"तुमच्या फोन नंबरने साइन अप करा आणि आरोग्य प्रोफाइल पूर्ण करा।"},
      {n:"02",i:"🌿",t:"प्रकृती चाचणी घ्या",d:"10 प्रश्नांची उत्तरे देऊन तुमची आयुर्वेदिक प्रकृती जाणून घ्या।"},
      {n:"03",i:"🩺",t:"वैद्य निवडा",d:"विशेषज्ञता, भाषा आणि उपलब्धतेनुसार डॉक्टर शोधा।"},
      {n:"04",i:"✨",t:"उपचार सुरू करा",d:"सल्लामसलतीत सहभागी व्हा आणि वैयक्तिक उपचार योजना मिळवा।"},
    ],
    cta: { eyebrow: "आज सुरू करा", title1: "तुमचा मार्ग", title2: "आरोग्याकडे", title3: "येथून सुरू होतो", sub: "12,000+ रुग्णांमध्ये सामील व्हा ज्यांनी आयुर्वेदाने संतुलन मिळवले", btn: "तुमचा प्रवास सुरू करा — मोफत" },
    footer: { copy: "© 2026 ĀrogyaMed · भारताच्या आरोग्यासाठी 🌿" },
  }
};

const switcherCss = `
.lang-switcher{position:relative;display:inline-block}
.lang-btn{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.7);padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s}
.lang-btn:hover{background:rgba(255,255,255,.1);color:#fff}
.lang-dropdown{position:absolute;top:calc(100% + 8px);right:0;background:#111;border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.5);min-width:160px;z-index:10000}
.lang-option{display:flex;align-items:center;gap:10px;padding:12px 16px;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.5);border:none;background:transparent;width:100%;text-align:left}
.lang-option:hover{background:rgba(255,255,255,.06);color:#fff}
.lang-option.active{color:#E8650A;background:rgba(232,101,10,.08)}
.lang-flag{font-size:16px}
`;

export function LanguageSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = translations[lang];

  return (
    <>
      <style>{switcherCss}</style>
      <div className="lang-switcher">
        <button className="lang-btn" onClick={() => setOpen(!open)}>
          <span className="lang-flag">{current.flag}</span>
          {current.name}
          <span style={{fontSize:'10px',opacity:.5}}>{open ? '▲' : '▼'}</span>
        </button>
        {open && (
          <div className="lang-dropdown">
            {Object.entries(translations).map(([key, val]) => (
              <button key={key} className={`lang-option ${lang === key ? 'active' : ''}`} onClick={() => { setLang(key); setOpen(false); }}>
                <span className="lang-flag">{val.flag}</span>
                {val.name}
                {lang === key && <span style={{marginLeft:'auto',color:'#E8650A'}}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export { translations };
export default LangContext;