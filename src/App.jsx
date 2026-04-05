import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const PRESETS = [
  // Cold = activation → alertness, energy, pre-workout, presentations
  { id: 1, name: "Energize",        totalTime: 7,  hotTime: 0,  hotTemp: null, coldTime: 7,  coldTemp: 60, type: "cold",        description: "Full cold. Sharp activation for early mornings or low energy." },
  // Hot = relaxation → muscles, wind-down, stress
  { id: 2, name: "Deep Relax",      totalTime: 10, hotTime: 10, hotTemp: 102,  coldTime: 0,  coldTemp: null, type: "hot",        description: "Full hot. Relaxes muscles, opens pores, ideal wind-down routine." },
  // Start Hot → End Cold = amplified activation → athletic recovery, performance priming
  { id: 3, name: "Performance",     totalTime: 10, hotTime: 7,  hotTemp: 100,  coldTime: 3,  coldTemp: 58, type: "hot-to-cold", description: "Hot then cold. Athletic recovery and morning performance priming." },
  // Start Cold → End Hot = regulation → stress, anxiety, work-to-home transition
  { id: 4, name: "De-stress",       totalTime: 9,  hotTime: 6,  hotTemp: 101,  coldTime: 3,  coldTemp: 62, type: "cold-to-hot", description: "Cold then hot. Anxiety reduction and emotional regulation." },
  // Cold short burst → alertness spike, pre-workout, presentation
  { id: 5, name: "Wake Up",         totalTime: 5,  hotTime: 0,  hotTemp: null, coldTime: 5,  coldTemp: 55, type: "cold",        description: "Short cold burst. Combats grogginess before a big moment." },
  // Hot focused → muscle recovery post-work, opens nasal passages
  { id: 6, name: "Recovery",        totalTime: 10, hotTime: 8,  hotTemp: 103,  coldTime: 2,  coldTemp: 65, type: "hot-to-cold", description: "Mostly hot with a cold finish. Post-work muscle recovery." },
  // Hot → relaxation, skin care note (shorter to avoid dryness)
  { id: 7, name: "Unwind",          totalTime: 8,  hotTime: 8,  hotTemp: 101,  coldTime: 0,  coldTemp: null, type: "hot",       description: "Warm and steady. Stress decompression and creative thinking." },
  // Cold → confidence, mood elevation
  { id: 8, name: "Confidence Reset",totalTime: 6,  hotTime: 2,  hotTemp: 99,   coldTime: 4,  coldTemp: 58, type: "hot-to-cold", description: "Hot start, strong cold finish. Mood elevation and confidence reset." },
];

const ARTICLES = [
  {
    id: 1,
    title: "6 cold shower benefits to consider",
    source: "UCLA Health",
    url: "https://www.uclahealth.org/news/article/6-cold-shower-benefits-consider",
    image: "/images/one.jpg",
    body: `Cold therapy, also called cryotherapy, uses exposure to cold temperatures to cool the body's tissues for therapeutic reasons. A cold shower — even just for a few minutes — can work as cold therapy to help you heal, recover and generally feel good, especially after exercise.\n\nCold showers are a convenient way for a weekend warrior, amateur athlete or anyone who enjoys exercise to get some of the benefits of cold therapy after a workout.\n\nThe shock of cold water can stimulate the blood cells that fight off infection. One study found that people who switched to cold showers called out sick from work 29% less than those who didn't.\n\nIncreasing circulation redistributes blood and delivers freshly oxygenated blood to areas of the body that need to recover. Cold temps make your blood vessels tighten, then as your body heats up again, the vessels expand and flush out inflammation.\n\nResearch suggests cold water may also boost mood and decrease anxiety. Cold water strains your body into survival mode, working hard to maintain core temperature — which stimulates increased blood flow and alertness.`,
  },
  {
    id: 2,
    title: "Cold showers: What the science really says",
    source: "CNN Health",
    url: "https://www.cnn.com/2024/07/24/health/cold-showers-benefits-risks-wellness",
    image: "/images/four.jpg",
    body: `Taking cold showers may have benefits for your mental and cardiovascular health, experts say. There is a long history of people using cold water therapies, tracing back to ancient Greece — and a growing body of research on this type of cold therapy.\n\nStudies tend to employ cold showers in the range of 50–60°F (10–15°C). A thermometer isn't required — most people's own perception of cold is enough to make the temperature change effective.\n\nParticipants who took showers at cold temperatures for up to a minute daily for two weeks reported lower stress levels than the control group, according to a 2022 study in Current Psychology.\n\nEasing from lukewarm into cold water is recommended rather than an abrupt switch. Starting with 15–30 seconds of cold exposure is a good baseline, then adding time gradually over weeks.\n\nBox breathing can help you stay calm during cold exposure: inhale for four counts, hold for four counts, exhale for four counts, and hold again. People with cardiovascular issues should consult a doctor before starting cold shower practice.`,
  },
  {
    id: 3,
    title: "The science behind contrast showers",
    source: "PLOS One",
    url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0317615",
    image: "/images/three.jpg",
    body: `Contrast water therapy (CWT) involves alternating between hot and cold water immersion. A 2025 systematic review and meta-analysis evaluated the psychological, cognitive, and physiological effects of cold water immersion across 11 studies with 3,177 participants.\n\nThe review found a significant reduction in stress 12 hours after cold water immersion. Improvements were also observed in sleep quality and overall quality of life across participants.\n\nThe alternating temperatures cause blood vessels to repeatedly dilate and constrict, creating a pumping effect that improves circulation and helps remove metabolic waste products from muscles.\n\nStudies found a 29% reduction in sickness absence among participants who took regular cold showers compared to those who did not, suggesting meaningful immune benefits over time.\n\nFor optimal results, research suggests starting with warm water for 3–4 minutes, switching to cold for 1–2 minutes, and repeating 3–4 cycles. Always end on cold for maximum alertness benefits.`,
  },
  {
    id: 4,
    title: "Cold water therapy and healthy aging",
    source: "PMC / NIH",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11872954/",
    image: "/images/five.jpg",
    body: `Evidence from interventional studies suggests that cold water therapy positively impacts cardiometabolic risk factors, stimulates brown adipose tissue, and promotes energy expenditure — potentially reducing the risk of cardiometabolic diseases.\n\nCold water therapy also triggers the release of stress hormones, catecholamines and endorphins, enhancing alertness and elevating mood — which may help alleviate mental health conditions over time.\n\nThe first recorded claims for the health benefits of cold water therapy date back to 3500 BC. Hippocrates documented its use for analgesic benefits and relieving fatigue. Thomas Jefferson reportedly used a cold foot bath every morning for six decades.\n\nRegular cold shower exposure appears to enhance humoral and cell-mediated immunity through upregulation of antibodies and interleukins, according to a 2024 study of 60 healthy adults over 90 days.\n\nThe optimal duration and temperature for maximal benefits is still being studied, but current evidence suggests short-term exposure at lower temperatures may be more beneficial than longer exposure at moderate cold.`,
  },
  {
    id: 5,
    title: "Hot showers vs. cold showers: Which is better?",
    source: "Healthline",
    url: "https://www.healthline.com/health/cold-shower-benefits",
    image: "/images/two.jpg",
    body: `Both hot and cold showers offer unique health benefits. The best choice depends on your personal health goals and how your body responds to temperature changes.\n\nHot showers help relax muscles, open pores, and improve circulation by dilating blood vessels. They are particularly beneficial before bed as they promote relaxation and better sleep quality.\n\nCold showers activate brown adipose tissue — the fat we are all born with that plays an important role in metabolic health. Healthy levels of brown fat indicate that white fat, associated with obesity and heart disease, will be at a healthier level too.\n\nBy bringing the temperature of an area of the body down, we speed up the delivery of warmer, freshly oxygenated blood to that area — which speeds up recovery time for muscles and tissue.\n\nThe shock of cold water in the bloodstream stimulates leukocytes, which help fight infection. This means taking cold showers may support your body's resistance to common illnesses like colds and flu.`,
  },
  {
    id: 6,
    title: "Morning shower routines and mental health",
    source: "Cleveland Clinic",
    url: "https://health.clevelandclinic.org/are-cold-showers-good-for-you",
    image: "/images/six.jpg",
    body: `Morning shower routines can have a profound effect on mental health and daily productivity. The ritual of showering sets a mental boundary between sleep and wakefulness, signaling to the brain that the day has begun.\n\nCold showers don't just wake up your body — they can refresh your mind too. That initial shock triggers a wave of alertness that may help you feel more clear-headed and focused throughout the day.\n\nResearch suggests that people feel more active, attentive, and alert after cold water immersion. Participants in studies reported feeling more inspired and less distressed and nervous following a cold water session.\n\nThe temperature of your shower adds a meaningful layer to your morning. Cold showers activate the sympathetic nervous system, releasing adrenaline and increasing alertness — particularly helpful for those who struggle with morning grogginess.\n\nWarm showers, conversely, activate the parasympathetic nervous system. For those experiencing morning anxiety, a warm shower can provide a calming transition. Intentionally choosing temperature based on your desired mental state transforms a passive routine into a wellness tool.`,
  },
];

const GOAL_OPTIONS = ["Focus", "Relaxation", "Stress Relief", "Energy", "Resilience", "Hygiene Only"];
const CONDITION_OPTIONS = ["Soreness", "Sickness", "Eczema", "Dry Skin"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(date) {
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toUpperCase().replace(",", "");
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function dateKey(date) {
  return date.toISOString().split("T")[0];
}

function computeInsights(logs) {
  const entries = Object.values(logs);
  if (entries.length === 0) return null;

  const withPreset = entries.filter(e => e.preset);

  // Energy: find preset with highest avg energy
  const energyByPreset = {};
  withPreset.forEach(e => {
    if (!energyByPreset[e.preset]) energyByPreset[e.preset] = [];
    energyByPreset[e.preset].push(e.energy);
  });
  let bestEnergyPreset = null, bestEnergyVal = -1;
  Object.entries(energyByPreset).forEach(([p, vals]) => {
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (avg > bestEnergyVal) { bestEnergyVal = avg; bestEnergyPreset = p; }
  });

  // Mood: find preset with best avg mood (1=happy, 4=sad)
  const moodByPreset = {};
  withPreset.forEach(e => {
    if (e.mood == null) return;
    if (!moodByPreset[e.preset]) moodByPreset[e.preset] = [];
    moodByPreset[e.preset].push(e.mood);
  });
  let bestMoodPreset = null, bestMoodVal = 99;
  Object.entries(moodByPreset).forEach(([p, vals]) => {
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (avg < bestMoodVal) { bestMoodVal = avg; bestMoodPreset = p; }
  });

  // Recommended time: time where skin dryness is lowest
  const drynessByTime = {};
  entries.forEach(e => {
    const t = e.showerTime || 8;
    if (!drynessByTime[t]) drynessByTime[t] = [];
    drynessByTime[t].push(e.skinDryness);
  });
  let bestTime = null, bestDryVal = 99;
  Object.entries(drynessByTime).forEach(([t, vals]) => {
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (avg < bestDryVal) { bestDryVal = avg; bestTime = t; }
  });

  // Relaxed: find preset with lowest avg energy (calm)
  let bestRelaxPreset = null, bestRelaxVal = 99;
  Object.entries(energyByPreset).forEach(([p, vals]) => {
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    if (avg < bestRelaxVal) { bestRelaxVal = avg; bestRelaxPreset = p; }
  });

  return {
    energy: bestEnergyPreset,
    mood: bestMoodPreset,
    time: bestTime,
    relax: bestRelaxPreset,
  };
}

// ─── Styles ──────────────────────────────────────────────────────────────────

// Load Poppins from Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

const styleEl = document.createElement("style");
styleEl.textContent = `
  * { scrollbar-width: none; -ms-overflow-style: none; }
  *::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(styleEl);

const FONT = "'Inter', sans-serif";

const S = {
  screen: {
    width: "100%",
    maxWidth: 390,
    margin: "0 auto",
    height: "100vh",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    fontFamily: FONT,
    position: "relative",
    overflow: "hidden",
  },
  screenGray: {
    background: "#b8c4c8",
  },
  screenLight: {
    background: "#f0f2f3",
  },
  body: {
    flex: 1,
    padding: "0 32px",
    overflowY: "auto",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "14px 0 20px",
    borderTop: "1px solid #e0e0e0",
    background: "#fff",
    flexShrink: 0,
  },
  navBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pill: {
    display: "block",
    width: "100%",
    padding: "17px 0",
    background: "#b8c4c8",
    border: "none",
    borderRadius: 32,
    fontSize: 15,
    fontFamily: FONT,
    fontWeight: 600,
    letterSpacing: 0.8,
    cursor: "pointer",
    textAlign: "center",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  pillSm: {
    display: "inline-block",
    padding: "8px 20px",
    background: "#b8c4c8",
    border: "none",
    borderRadius: 22,
    fontSize: 14,
    fontFamily: FONT,
    fontWeight: 500,
    cursor: "pointer",
    color: "#1a1a1a",
  },
  pillOutline: {
    display: "inline-block",
    padding: "8px 20px",
    background: "transparent",
    border: "1.5px solid #b8c4c8",
    borderRadius: 22,
    fontSize: 14,
    fontFamily: FONT,
    fontWeight: 500,
    cursor: "pointer",
    color: "#1a1a1a",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 1.2,
    color: "#1a1a1a",
    marginBottom: 8,
    display: "block",
    fontFamily: FONT,
  },
  muted: {
    fontSize: 12,
    color: "#999",
    letterSpacing: 0.8,
    fontFamily: FONT,
    fontWeight: 400,
  },
  logo: {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: 4,
    color: "#1a1a1a",
    textAlign: "center",
  },
  logoSm: {
    fontFamily: FONT,
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: 3,
    color: "#1a1a1a",
    textAlign: "center",
  },
  back: {
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    padding: "24px 24px 0",
    color: "#1a1a1a",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid #c8d0d4",
    borderRadius: 12,
    fontSize: 15,
    fontFamily: FONT,
    background: "#e8eced",
    boxSizing: "border-box",
    color: "#1a1a1a",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "14px 16px",
    border: "1.5px solid #c8d0d4",
    borderRadius: 14,
    fontSize: 15,
    fontFamily: FONT,
    background: "#fff",
    boxSizing: "border-box",
    resize: "none",
    color: "#1a1a1a",
    outline: "none",
    minHeight: 110,
  },
  slider: {
    width: "100%",
    accentColor: "#6a8a94",
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  editPill: {
    padding: "7px 18px",
    border: "1.5px solid #b8c4c8",
    borderRadius: 22,
    fontSize: 14,
    fontFamily: FONT,
    fontWeight: 500,
    background: "transparent",
    cursor: "pointer",
    color: "#1a1a1a",
  },
};

// ─── Nav Icons ────────────────────────────────────────────────────────────────

function HomeIcon({ filled }) {
  return (
    <svg width="24" height="24" fill="none" stroke={filled ? "#1a1a1a" : "#888"} strokeWidth={filled ? 2.2 : 1.5} viewBox="0 0 24 24">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" fill={filled ? "#1a1a1a" : "none"} strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChartIcon({ filled }) {
  return (
    <svg width="24" height="24" fill="none" stroke={filled ? "#1a1a1a" : "#888"} strokeWidth={filled ? 2.2 : 1.5} viewBox="0 0 24 24">
      <rect x="3" y="12" width="4" height="9" rx="1" fill={filled ? "#1a1a1a" : "none"}/>
      <rect x="10" y="7" width="4" height="14" rx="1" fill={filled ? "#1a1a1a" : "none"}/>
      <rect x="17" y="3" width="4" height="18" rx="1" fill={filled ? "#1a1a1a" : "none"}/>
    </svg>
  );
}
function SliderIcon({ filled }) {
  return (
    <svg width="24" height="24" fill="none" stroke={filled ? "#1a1a1a" : "#888"} strokeWidth={filled ? 2.2 : 1.5} viewBox="0 0 24 24">
      <line x1="4" y1="6" x2="20" y2="6" strokeLinecap="round"/>
      <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round"/>
      <line x1="4" y1="18" x2="20" y2="18" strokeLinecap="round"/>
      <circle cx="8" cy="6" r="2.5" fill={filled ? "#1a1a1a" : "#fff"} stroke={filled ? "#1a1a1a" : "#888"}/>
      <circle cx="16" cy="12" r="2.5" fill={filled ? "#1a1a1a" : "#fff"} stroke={filled ? "#1a1a1a" : "#888"}/>
      <circle cx="10" cy="18" r="2.5" fill={filled ? "#1a1a1a" : "#fff"} stroke={filled ? "#1a1a1a" : "#888"}/>
    </svg>
  );
}
function BookIcon({ filled }) {
  return (
    <svg width="24" height="24" fill="none" stroke={filled ? "#1a1a1a" : "#888"} strokeWidth={filled ? 2.2 : 1.5} viewBox="0 0 24 24">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" fill={filled ? "#e8eced" : "none"} strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "home", icon: HomeIcon },
    { id: "insights", icon: ChartIcon },
    { id: "presets", icon: SliderIcon },
    { id: "knowledge", icon: BookIcon },
  ];
  return (
    <div style={S.navBar}>
      {tabs.map(({ id, icon: Icon }) => (
        <button key={id} style={S.navBtn} onClick={() => onNav(id)}>
          <Icon filled={active === id} />
        </button>
      ))}
    </div>
  );
}

// ─── Editable Value Pill ──────────────────────────────────────────────────────

function EditPill({ value, unit, onEdit }) {
  return (
    <button style={S.editPill} onClick={onEdit}>
      {value} {unit}
    </button>
  );
}

function EditModal({ label, value, unit, onSave, onClose }) {
  const [val, setVal] = useState(String(value));
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 260 }}>
        <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>{label}</div>
        <input
          style={{ ...S.input, marginBottom: 18 }}
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          autoFocus
        />
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ ...S.pill, flex: 1, marginBottom: 0, background: "#e8eced" }} onClick={onClose}>Cancel</button>
          <button style={{ ...S.pill, flex: 1, marginBottom: 0 }} onClick={() => onSave(Number(val))}>Save</button>
        </div>
      </div>
    </div>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

// 1. Splash
function SplashScreen() {
  return (
    <div style={{ ...S.screen, justifyContent: "center", alignItems: "center" }}>
      <div style={S.logo}>νερό</div>
      <div style={{ ...S.muted, textAlign: "center", letterSpacing: 5, marginTop: 10, fontSize: 11 }}>SHOWER DEVICE</div>
    </div>
  );
}

// 2. Onboarding carousel
const ONBOARD_SLIDES = [
  "Research on shower temperature is limited because preferences vary and every body responds differently.",
  "While general findings may benefit many people, this app isn't designed to tell you what works best for everyone else.",
  <>Instead, it helps you understand how different temperatures affect <strong>YOU</strong> and <strong>YOUR</strong> body.</>,
  "To create the most accurate recommendations, we encourage you to log your results.",
];

function OnboardingScreen({ onDone }) {
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = () => {
    if (sliding) return;
    setDirection(1);
    setSliding(true);
    setTimeout(() => {
      if (idx < ONBOARD_SLIDES.length - 1) setIdx(i => i + 1);
      else { setSliding(false); onDone(); return; }
      setSliding(false);
    }, 320);
  };

  return (
    <div style={{ ...S.screen, justifyContent: "space-between", cursor: "pointer", overflow: "hidden" }} onClick={next}>
      <style>{`
        @keyframes slideInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOutLeft { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-60px); } }
        .slide-in { animation: slideInRight 0.32s ease forwards; }
        .slide-out { animation: slideOutLeft 0.32s ease forwards; }
      `}</style>
      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 40px" }}>
        <p
          key={idx}
          className="slide-in"
          style={{ fontSize: 19, lineHeight: 1.55, color: "#1a1a1a", textAlign: "center", fontFamily: FONT, fontWeight: 400, margin: 0 }}>
          {ONBOARD_SLIDES[idx]}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 12, paddingBottom: 60 }}>
        {ONBOARD_SLIDES.map((_, i) => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: "50%",
            background: i === idx ? "#1a1a1a" : "transparent",
            border: "1.5px solid #1a1a1a",
            transition: "background 0.25s",
          }} />
        ))}
      </div>
    </div>
  );
}

// 3. Warning screen
function WarningScreen({ onNext }) {
  return (
    <div style={{ ...S.screen }}>
      <div style={{ padding: "44px 32px 28px", flex: 1, overflowY: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={S.logo}>νερό</div>
          <div style={{ ...S.muted, letterSpacing: 5, fontSize: 11, marginTop: 6 }}>SHOWER DEVICE</div>
        </div>
        <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: 20, marginBottom: 22, fontFamily: FONT, letterSpacing: 2 }}>WARNING</h2>
        <p style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 18, fontFamily: FONT, fontWeight: 400, color: "#333" }}>
          Individuals with the following conditions should use extreme caution when engaging in cold or contrast showers. Consultation with a healthcare professional is strongly recommended before using this device and/or app.
        </p>
        <ul style={{ fontSize: 14, lineHeight: 2.4, paddingLeft: 20, fontFamily: FONT, fontWeight: 400, color: "#333" }}>
          <li>Chronic illnesses such as diabetes or respiratory conditions</li>
          <li>Compromised immune systems or other long-term medical conditions</li>
          <li>Cardiovascular conditions, including heart disease, coronary artery disease, or heart failure</li>
          <li>High blood pressure (hypertension)</li>
          <li>History of stroke</li>
          <li>Raynaud's disease</li>
          <li>Pregnancy</li>
          <li>Children under 16 years of age</li>
        </ul>
      </div>
      <div style={{ padding: "0 32px 36px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ ...S.pillSm, fontSize: 22, padding: "8px 22px" }} onClick={onNext}>›</button>
      </div>
    </div>
  );
}

// 4. Getting started
function GettingStartedScreen({ onDone }) {
  const [form, setForm] = useState({ name: "", birthDate: "", gender: "", workouts: "", coldShower: "", coldFreq: "" });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const ToggleGroup = ({ options, value, onChange }) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{
          ...S.pillSm,
          background: value === o ? "#6a8a94" : "#b8c4c8",
          color: value === o ? "#fff" : "#1a1a1a",
        }}>{o}</button>
      ))}
    </div>
  );

  return (
    <div style={{ ...S.screen }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "48px 32px 28px" }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, textAlign: "center", marginBottom: 48, fontFamily: FONT, letterSpacing: 2 }}>GETTING STARTED</h2>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 8 }}>NAME</span>
          <input style={{ ...S.input, width: "100%" }} value={form.name} onChange={e => set("name", e.target.value)} placeholder="" />
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 8 }}>EMAIL</span>
          <input style={{ ...S.input, width: "100%" }} type="email" value={form.email || ""} onChange={e => set("email", e.target.value)} placeholder="" />
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 8 }}>BIRTH DATE</span>
          <input style={{ ...S.input, width: "100%" }} type="date" value={form.birthDate} onChange={e => set("birthDate", e.target.value)} />
        </div>

        <div style={{ marginBottom: 36 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 12 }}>GENDER</span>
          <ToggleGroup options={["Female", "Male"]} value={form.gender} onChange={v => set("gender", v)} />
        </div>

        <div style={{ marginBottom: 36 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 12 }}>HOW OFTEN DO YOU WORK OUT A WEEK?</span>
          <ToggleGroup options={["0-1 days", "2-3 days", "4+ days"]} value={form.workouts} onChange={v => set("workouts", v)} />
        </div>

        <div style={{ marginBottom: 36 }}>
          <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 12 }}>DO YOU CURRENTLY TAKE COLD SHOWERS?</span>
          <ToggleGroup options={["Yes", "No"]} value={form.coldShower} onChange={v => set("coldShower", v)} />
        </div>

        {form.coldShower === "Yes" && (
          <div style={{ marginBottom: 36 }}>
            <span style={{ fontWeight: 600, fontSize: 13, fontFamily: FONT, letterSpacing: 1, color: "#666", display: "block", marginBottom: 12 }}>IF SO, HOW OFTEN?</span>
            <ToggleGroup options={["0 days", "1-3 days", "4+ days"]} value={form.coldFreq} onChange={v => set("coldFreq", v)} />
          </div>
        )}
      </div>
      <div style={{ padding: "12px 32px 36px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ ...S.logoSm, fontSize: 20 }}>νερό</div>
        <button style={{ ...S.pillSm, fontSize: 20, padding: "8px 22px" }} onClick={onDone}>›</button>
      </div>
    </div>
  );
}

// 5. Home screen
function HomeScreen({ logs, onShower, onResults }) {
  const [date, setDate] = useState(new Date(2026, 0, 8));

  return (
    <div style={S.screen}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, padding: "56px 36px 0" }}>
        <button style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer", color: "#1a1a1a" }} onClick={() => setDate(d => addDays(d, -1))}>‹</button>
        <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: 2, fontFamily: FONT }}>{formatDate(date)}</span>
        <button style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer", color: "#1a1a1a" }} onClick={() => setDate(d => addDays(d, 1))}>›</button>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 36px" }}>
        <button style={S.pill} onClick={() => onShower(date)}>SHOWER</button>
        <button style={S.pill} onClick={() => onResults(date)}>RESULTS</button>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <span style={S.logoSm}>νερό</span>
        </div>
      </div>
      <BottomNav active="home" onNav={tab => {
        if (tab === "home") return;
        if (tab === "insights") onResults(date, "insights");
        if (tab === "presets") onResults(date, "presets");
        if (tab === "knowledge") onResults(date, "knowledge");
      }} />
    </div>
  );
}

// 6. Preset list (shower flow — no create option)
function PresetListScreen({ presets, onSelect, onBack, onNav }) {
  return (
    <div style={S.screen}>
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ textAlign: "center", padding: "8px 0 0" }}>
        <span style={S.logo}>νερό</span>
        <div style={{ ...S.muted, letterSpacing: 5, fontSize: 11, marginTop: 6, marginBottom: 28 }}>PRESETS</div>
      </div>
      <div style={{ flex: 1, padding: "0 32px 0", overflowY: "auto" }}>
        {presets.map(p => (
          <button key={p.id} style={S.pill} onClick={() => onSelect(p)}>{p.name}</button>
        ))}
      </div>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

// 7. Preset selected
function PresetSelectedScreen({ preset: initialPreset, isPresetNav, onStart, onSubmit, onBack, onNav }) {
  const [preset, setPreset] = useState(initialPreset);
  const [editField, setEditField] = useState(null);

  const typeLabel = { "cold": "COLD", "hot": "HOT", "hot-to-cold": "HOT → COLD", "cold-to-hot": "COLD → HOT" };
  const typeColor = { "cold": "#6a8a94", "hot": "#6a8a94", "hot-to-cold": "#6a8a94", "cold-to-hot": "#6a8a94" };

  const fields = [
    { key: "totalTime", label: "TOTAL TIME", unit: "min" },
    ...(preset.hotTime > 0 ? [
      { key: "hotTime", label: "HOT", unit: "min" },
      { key: "hotTemp", label: "HOT TEMP", unit: "°F" },
    ] : []),
    ...(preset.coldTime > 0 ? [
      { key: "coldTime", label: "COLD", unit: "min" },
      { key: "coldTemp", label: "COLD TEMP", unit: "°F" },
    ] : []),
  ];

  return (
    <div style={S.screen}>
      {editField && (
        <EditModal
          label={editField.label}
          value={preset[editField.key]}
          unit={editField.unit}
          onSave={v => { setPreset(p => ({ ...p, [editField.key]: v })); setEditField(null); }}
          onClose={() => setEditField(null)}
        />
      )}
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ flex: 1, padding: "8px 32px 0", overflowY: "auto" }}>
        <h2 style={{ fontWeight: 700, textAlign: "center", marginBottom: 20, fontSize: 17, fontFamily: FONT, letterSpacing: 2 }}>PRESET SELECTED</h2>

        {/* Name + type badge */}
        <div style={{ background: "#b8c4c8", borderRadius: 18, padding: "22px 20px", marginBottom: 12 }}>
          <div style={{ fontSize: 22, fontWeight: 500, fontFamily: FONT, textAlign: "center", marginBottom: 10 }}>{preset.name}</div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ background: typeColor[preset.type] || "#6a8a94", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: 1.5, padding: "4px 12px", borderRadius: 20, fontFamily: FONT }}>
              {typeLabel[preset.type] || preset.type?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 13, color: "#666", fontFamily: FONT, fontWeight: 400, textAlign: "center", marginBottom: 24, lineHeight: 1.6 }}>{preset.description}</p>

        <div style={{ textAlign: "right", ...S.muted, marginBottom: 12 }}>TAP TO EDIT</div>
        {fields.map(f => (
          <div key={f.key} style={S.row}>
            <span style={{ fontWeight: 600, fontSize: 14, fontFamily: FONT, letterSpacing: 0.5 }}>{f.label}</span>
            <EditPill value={preset[f.key]} unit={f.unit} onEdit={() => setEditField(f)} />
          </div>
        ))}
        <button style={{ ...S.pill, marginTop: 24 }} onClick={() => isPresetNav ? onSubmit() : onStart(preset)}>
          {isPresetNav ? "SUBMIT" : "START"}
        </button>
      </div>
      <BottomNav active="presets" onNav={onNav} />
    </div>
  );
}

// 7.5 Connecting device screen
function ConnectingScreen({ onDone }) {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const dotTimer = setInterval(() => setDots(d => (d + 1) % 4), 500);
    const doneTimer = setTimeout(onDone, 3000);
    return () => { clearInterval(dotTimer); clearTimeout(doneTimer); };
  }, []);

  return (
    <div style={{ ...S.screen, ...S.screenGray, justifyContent: "center", alignItems: "center" }}>
      <style>{`
        @keyframes btPulse { 0%,100%{opacity:0.3;transform:scale(0.95)} 50%{opacity:1;transform:scale(1.05)} }
        .bt-pulse { animation: btPulse 1.4s ease-in-out infinite; }
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div className="bt-pulse">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/>
          </svg>
        </div>
        <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: 3, fontFamily: FONT }}>
          CONNECTING DEVICE{"." .repeat(dots) + "\u00A0".repeat(3 - dots)}
        </div>
      </div>
    </div>
  );
}

// 8. Countdown
function CountdownScreen({ onDone, onCancel }) {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count === 0) { onDone(); return; }
    const t = setTimeout(() => setCount(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <div style={{ ...S.screen, ...S.screenGray, justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 24, letterSpacing: 3, fontFamily: FONT }}>STARTING IN...</div>
        <div style={{ fontWeight: 300, fontSize: 108, lineHeight: 1, fontFamily: FONT }}>{count}</div>
      </div>
      <div style={{ paddingBottom: 64, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <button style={{ ...S.pill, width: 220, marginBottom: 0, background: "transparent", border: "1.5px solid rgba(26,26,26,0.35)", color: "#1a1a1a" }} onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  );
}

// 9. Showering
function ShoweringScreen({ onResults, onCancel }) {
  return (
    <div style={{ ...S.screen, ...S.screenGray, justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: 3, fontFamily: FONT }}>SHOWERING</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: "100%", padding: "0 52px 68px" }}>
        <button style={{ ...S.pill, marginBottom: 0, background: "transparent", border: "1.5px solid rgba(26,26,26,0.35)", color: "#1a1a1a" }} onClick={onResults}>RESULTS</button>
        <button style={{ ...S.pill, marginBottom: 0, background: "transparent", border: "1.5px solid rgba(26,26,26,0.35)", color: "#1a1a1a" }} onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  );
}

// 10. Results / Log
function ResultsScreen({ date, logs, setLogs, preset, showerTime, readOnly, onBack, onNav, onSubmitted }) {
  const key = dateKey(date);
  const existing = logs[key] || {};

  const [selectedPreset, setSelectedPreset] = useState(existing.preset || preset?.name || "");
  const [time, setTime] = useState(existing.showerTime || showerTime || 8);
  const [mood, setMood] = useState(existing.mood ?? null);
  const [skinDryness, setSkinDryness] = useState(existing.skinDryness ?? 3);
  const [energy, setEnergy] = useState(existing.energy ?? 3);
  const [notes, setNotes] = useState(existing.notes || "");
  const [editPreset, setEditPreset] = useState(false);
  const [editTime, setEditTime] = useState(false);

  const [reEntering, setReEntering] = useState(false);
  const isReadOnly = (readOnly || !!existing.submitted) && !reEntering;

  const moods = [0, 1, 2, 3, 4];

  const handleSubmit = () => {
    setLogs(l => ({
      ...l,
      [key]: { preset: selectedPreset, showerTime: time, mood, skinDryness, energy, notes, submitted: true }
    }));
    onSubmitted();
  };

  return (
    <div style={S.screen}>
      {editPreset && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 280 }}>
            <div style={{ fontWeight: 700, marginBottom: 16, fontSize: 15, fontFamily: FONT }}>Preset Used</div>
            {PRESETS.map(p => (
              <button key={p.id} onClick={() => { setSelectedPreset(p.name); setEditPreset(false); }}
                style={{ ...S.pill, marginBottom: 10, background: selectedPreset === p.name ? "#6a8a94" : "#b8c4c8", color: selectedPreset === p.name ? "#fff" : "#1a1a1a" }}>
                {p.name}
              </button>
            ))}
            <button style={{ ...S.pill, marginBottom: 0, background: "#e8eced" }} onClick={() => setEditPreset(false)}>Cancel</button>
          </div>
        </div>
      )}
      {editTime && (
        <EditModal label="Time in Shower" value={time} unit="min" onSave={v => { setTime(v); setEditTime(false); }} onClose={() => setEditTime(false)} />
      )}
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ flex: 1, padding: "0 32px 24px", overflowY: "auto" }}>
        <h2 style={{ fontWeight: 600, textAlign: "center", fontSize: 17, marginBottom: 32, fontFamily: FONT, letterSpacing: 2 }}>{formatDate(date)}</h2>

        <div style={S.row}>
          <span style={{ fontWeight: 400, fontSize: 14, fontFamily: FONT }}>Preset used</span>
          <button style={S.editPill} onClick={() => !isReadOnly && setEditPreset(true)}>{selectedPreset || "—"}</button>
        </div>
        <div style={S.row}>
          <span style={{ fontWeight: 400, fontSize: 14, fontFamily: FONT }}>Time in shower</span>
          <button style={S.editPill} onClick={() => !isReadOnly && setEditTime(true)}>{time} min</button>
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 14, fontFamily: FONT, letterSpacing: 0.5 }}>Mood</span>
          <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
            {moods.map((m, i) => (
              <div key={i}
                style={{ cursor: isReadOnly ? "default" : "pointer", opacity: mood === i ? 1 : 0.25, transition: "opacity 0.15s" }}
                onClick={() => !isReadOnly && setMood(i)}>
                <MoodFace type={i} size={32} color="#1a1a1a" />
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 14, fontFamily: FONT, letterSpacing: 0.5 }}>Skin Dryness</span>
          <input type="range" min={1} max={5} step={1} value={skinDryness} onChange={e => !isReadOnly && setSkinDryness(Number(e.target.value))} style={{ ...S.slider, marginTop: 14, display: "block" }} disabled={isReadOnly} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 14, fontFamily: FONT, letterSpacing: 0.5 }}>Energy Levels</span>
          <input type="range" min={1} max={5} step={1} value={energy} onChange={e => !isReadOnly && setEnergy(Number(e.target.value))} style={{ ...S.slider, marginTop: 14, display: "block" }} disabled={isReadOnly} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <span style={{ fontWeight: 600, fontSize: 14, display: "block", marginBottom: 12, fontFamily: FONT, letterSpacing: 0.5 }}>Notes</span>
          <textarea style={S.textarea} value={notes} onChange={e => !isReadOnly && setNotes(e.target.value)} rows={4} readOnly={isReadOnly} />
        </div>

        {!isReadOnly && (
          <button style={{ ...S.pill, marginTop: 8 }} onClick={handleSubmit}>SUBMIT</button>
        )}

        {(readOnly || !!existing.submitted) && !reEntering && (
          <button style={{ ...S.pill, marginTop: 8, background: "transparent", border: "1.5px solid #b8c4c8", color: "#1a1a1a" }}
            onClick={() => setReEntering(true)}>
            RE-ENTER RESULTS
          </button>
        )}
      </div>
      <BottomNav active="home" onNav={onNav} />
    </div>
  );
}

// 11. Submitted flash
function SubmittedScreen() {
  return (
    <div style={{ ...S.screen, ...S.screenGray, justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: 4, fontFamily: FONT }}>SUBMITTED</div>
      </div>
      <div style={{ paddingBottom: 52 }}>
        <span style={S.logoSm}>νερό</span>
      </div>
    </div>
  );
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

const IC = ({ d, size = 24, stroke = "#1a1a1a", sw = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  energy: (s, c) => <IC size={s} stroke={c} d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  mood:   (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5}/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5}/>
    </svg>
  ),
  time:   (s, c) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  relax:  (s, c) => <IC size={s} stroke={c} d={["M18 8h1a4 4 0 010 8h-1","M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z","M6 1v3","M10 1v3","M14 1v3"]} />,
};

// Mood SVG faces
function MoodFace({ type, size = 28, color = "#1a1a1a" }) {
  const expressions = {
    ecstatic: { mouth: "M7 12s2 4 5 4 5-4 5-4", eyeL: [9, 8.5], eyeR: [15, 8.5] },
    happy:    { mouth: "M8 13s1.5 2.5 4 2.5 4-2.5 4-2.5", eyeL: [9, 9], eyeR: [15, 9] },
    neutral:  { mouth: "M8 13h8",                           eyeL: [9, 9], eyeR: [15, 9] },
    sad:      { mouth: "M8 15s1.5-2 4-2 4 2 4 2",          eyeL: [9, 9], eyeR: [15, 9] },
    upset:    { mouth: "M8 16s1.5-2.5 4-2.5 4 2.5 4 2.5",  eyeL: [9, 9], eyeR: [15, 9] },
  };
  const types = ["ecstatic", "happy", "neutral", "sad", "upset"];
  const ex = expressions[types[type]] || expressions.happy;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d={ex.mouth} />
      {ex.eyebrows && <path d={ex.eyebrows} strokeWidth={1.2} />}
      <circle cx={ex.eyeL[0]} cy={ex.eyeL[1]} r="1" fill={color} stroke="none" />
      <circle cx={ex.eyeR[0]} cy={ex.eyeR[1]} r="1" fill={color} stroke="none" />
    </svg>
  );
}

// 12. Insights screen
function InsightsScreen({ logs, onCalendar, onNav }) {
  const insights = computeInsights(logs);

  const items = insights ? [
    { iconKey: "energy", bold: "More energy",        rest: `with ${insights.energy || "COLD"} showers` },
    { iconKey: "mood",   bold: "Better mood",         rest: `with ${insights.mood || "HOT to COLD"} showers` },
    { iconKey: "time",   bold: "Recommended time",    rest: `in shower: ${insights.time || 12} min` },
    { iconKey: "relax",  bold: "More relaxed",        rest: `with ${insights.relax || "HOT"} showers` },
  ] : [
    { iconKey: "energy", bold: "More energy",        rest: "with COLD showers" },
    { iconKey: "mood",   bold: "Better mood",         rest: "with HOT to COLD showers" },
    { iconKey: "time",   bold: "Recommended time",    rest: "in shower: 12 min" },
    { iconKey: "relax",  bold: "More relaxed",        rest: "with HOT showers" },
  ];

  return (
    <div style={S.screen}>
      <div style={{ flex: 1, padding: "52px 32px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={S.logo}>νερό</span>
          <div style={{ ...S.muted, letterSpacing: 5, fontSize: 11, marginTop: 6 }}>INSIGHTS</div>
        </div>
        <button style={{ ...S.pill, letterSpacing: 2, marginBottom: 24 }} onClick={onCalendar}>CALENDAR</button>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "18px 0", borderBottom: i < items.length - 1 ? "1px solid #f0f0f0" : "none" }}>
              <div style={{ width: 54, height: 54, background: "#f0f2f3", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {ICONS[item.iconKey](24, "#1a1a1a")}
              </div>
              <div style={{ fontFamily: FONT }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{item.bold}</div>
                <div style={{ fontWeight: 400, fontSize: 14, color: "#666" }}>{item.rest}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="insights" onNav={onNav} />
    </div>
  );
}

// 13. Calendar screen
function CalendarScreen({ logs, onSelectDay, onBack }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 8));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "short" }).toUpperCase().slice(0, 2);
  const [selected, setSelected] = useState(8);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1;

  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const today = 8;

  return (
    <div style={S.screen}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 24px 96px" }}>

        {/* νερό logo */}
        <div style={{ ...S.logoSm, textAlign: "left", marginBottom: 4 }}>νερό</div>

        {/* Big date + arrows on same row, day-of-week far right */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 88, lineHeight: 1, fontFamily: FONT, letterSpacing: -2 }}>
              {String(currentDate.getDate()).padStart(2, "0")}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#1a1a1a" }}
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>‹</button>
              <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#1a1a1a" }}
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>›</button>
            </div>
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, fontFamily: FONT }}>{dayOfWeek}</div>
        </div>

        {/* Month + year */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 24 }}>
          <span style={{ fontWeight: 700, fontSize: 18, fontFamily: FONT, letterSpacing: 1 }}>{monthName}</span>
          <span style={{ fontWeight: 400, fontSize: 14, color: "#999", fontFamily: FONT }}>{year}</span>
        </div>

        {/* Day headers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontWeight: 500, fontSize: 12, color: "#aaa", fontFamily: FONT, paddingBottom: 6 }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 7 }}>
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const dateObj = new Date(year, month, day);
            const key = dateKey(dateObj);
            const hasLog = !!logs[key];
            const isToday = day === today;
            const isSel = selected === day;
            return (
              <div key={i} onClick={() => { setSelected(day); onSelectDay(dateObj); }}
                style={{
                  aspectRatio: "1",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 500, cursor: day > today ? "default" : "pointer", fontFamily: FONT,
                  background: isSel ? "#6a8a94" : hasLog ? "#b0bec5" : "#e4e8ea",
                  color: isSel ? "#fff" : "#1a1a1a",
                  opacity: day > today ? 0.25 : 1,
                  transition: "background 0.15s",
                }}>
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav active="insights" onNav={onBack} />
    </div>
  );
}

// 14. Create preset list
function CreatePresetListScreen({ presets, onSelect, onNew, onBack, onNav }) {
  return (
    <div style={S.screen}>
      <div style={{ textAlign: "center", padding: "52px 0 0" }}>
        <span style={S.logo}>νερό</span>
        <div style={{ ...S.muted, letterSpacing: 5, fontSize: 11, marginTop: 6, marginBottom: 28 }}>PRESETS</div>
      </div>
      <div style={{ flex: 1, padding: "0 32px 0", overflowY: "auto" }}>
        {presets.map(p => (
          <button key={p.id} style={S.pill} onClick={() => onSelect(p)}>{p.name}</button>
        ))}
        <h3 style={{ fontWeight: 600, textAlign: "center", margin: "32px 0 16px", fontSize: 15, fontFamily: FONT, letterSpacing: 2 }}>CREATE A PRESET</h3>
        <button style={S.pill} onClick={onNew}>+</button>
      </div>
      <BottomNav active="presets" onNav={onNav} />
    </div>
  );
}

// 15. New preset form
function NewPresetFormScreen({ onSubmit, onBack }) {
  const [goals, setGoals] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [minTime, setMinTime] = useState(8);

  const toggleGoal = g => setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : prev.length < 2 ? [...prev, g] : prev);
  const toggleCond = c => setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const basePreset = {
    totalTime: minTime,
    hotTime: Math.round(minTime * 0.7),
    hotTemp: 101,
    coldTime: Math.round(minTime * 0.3),
    coldTemp: 60,
    type: "hot-to-cold",
    description: "Custom preset based on your preferences.",
  };

  return (
    <div style={S.screen}>
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ textAlign: "center", marginBottom: 4 }}>
        <span style={S.logo}>νερό</span>
      </div>
      <div style={{ flex: 1, padding: "0 32px 24px", overflowY: "auto" }}>
        <h2 style={{ fontWeight: 700, textAlign: "center", fontSize: 17, marginBottom: 28, fontFamily: FONT, letterSpacing: 2 }}>CREATE A PRESET</h2>

        <p style={{ fontWeight: 600, textAlign: "center", marginBottom: 16, fontFamily: FONT, fontSize: 15 }}>What would you like to achieve?<br /><span style={{ fontWeight: 300, fontSize: 13 }}>(Select up to 2)</span></p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32, justifyContent: "center" }}>
          {GOAL_OPTIONS.map(g => (
            <button key={g} onClick={() => toggleGoal(g)} style={{ ...S.pillSm, background: goals.includes(g) ? "#6a8a94" : "#b8c4c8", color: goals.includes(g) ? "#fff" : "#1a1a1a" }}>{g}</button>
          ))}
        </div>

        <p style={{ fontWeight: 600, textAlign: "center", marginBottom: 16, fontFamily: FONT, fontSize: 15 }}>Are you experiencing...</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32, justifyContent: "center" }}>
          {CONDITION_OPTIONS.map(c => (
            <button key={c} onClick={() => toggleCond(c)} style={{ ...S.pillSm, background: conditions.includes(c) ? "#6a8a94" : "#b8c4c8", color: conditions.includes(c) ? "#fff" : "#1a1a1a" }}>{c}</button>
          ))}
        </div>

        <p style={{ fontWeight: 600, textAlign: "center", marginBottom: 16, fontFamily: FONT, fontSize: 15 }}>Minimum time needed in shower</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 36 }}>
          <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#1a1a1a" }} onClick={() => setMinTime(t => Math.max(1, t - 1))}>‹</button>
          <span style={{ ...S.pillSm, minWidth: 80, textAlign: "center" }}>{minTime} min</span>
          <button style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#1a1a1a" }} onClick={() => setMinTime(t => t + 1)}>›</button>
        </div>

        <button style={S.pill} onClick={() => onSubmit(basePreset)}>SUBMIT</button>
      </div>
    </div>
  );
}

// 16. New preset confirm
function NewPresetConfirmScreen({ basePreset, onConfirm, onBack, onNav }) {
  const [name, setName] = useState("");
  const [preset, setPreset] = useState(basePreset);
  const [editField, setEditField] = useState(null);

  const fields = [
    { key: "totalTime", label: "TOTAL TIME", unit: "min" },
    { key: "hotTime", label: "HOT", unit: "min" },
    { key: "hotTemp", label: "RECOMMENDED TEMP", unit: "F" },
    { key: "coldTime", label: "COLD", unit: "min" },
    { key: "coldTemp", label: "RECOMMENDED TEMP", unit: "F" },
  ];

  return (
    <div style={S.screen}>
      {editField && (
        <EditModal label={editField.label} value={preset[editField.key]} unit={editField.unit}
          onSave={v => { setPreset(p => ({ ...p, [editField.key]: v })); setEditField(null); }}
          onClose={() => setEditField(null)} />
      )}
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ flex: 1, padding: "8px 32px 0", overflowY: "auto" }}>
        <h2 style={{ fontWeight: 700, textAlign: "center", fontSize: 17, marginBottom: 28, fontFamily: FONT, letterSpacing: 2 }}>NEW PRESET</h2>
        <div style={{ background: "#b8c4c8", borderRadius: 18, padding: "22px 24px", marginBottom: 32 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Preset name..."
            style={{ background: "transparent", border: "none", borderBottom: "1.5px solid #6a8a94", width: "100%", fontSize: 18, fontFamily: FONT, fontWeight: 300, outline: "none", paddingBottom: 6, color: "#1a1a1a" }} />
        </div>
        <div style={{ textAlign: "right", ...S.muted, marginBottom: 12 }}>TAP TO EDIT</div>
        {fields.map(f => (
          <div key={f.key} style={S.row}>
            <span style={{ fontWeight: 600, fontSize: 14, fontFamily: FONT, letterSpacing: 0.5 }}>{f.label}</span>
            <EditPill value={preset[f.key]} unit={f.unit} onEdit={() => setEditField(f)} />
          </div>
        ))}
        <button style={{ ...S.pill, marginTop: 24 }} onClick={() => onConfirm({ ...preset, name: name || "New Preset" })}>CONFIRM</button>
      </div>
      <BottomNav active="presets" onNav={onNav} />
    </div>
  );
}

// 17. Knowledge list
function KnowledgeListScreen({ onArticle, onNav }) {
  return (
    <div style={S.screen}>
      <div style={{ flex: 1, padding: "52px 20px 0", overflowY: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={S.logo}>νερό</span>
          <div style={{ ...S.muted, letterSpacing: 5, fontSize: 11, marginTop: 6, marginBottom: 28 }}>KNOWLEDGE</div>
        </div>
        {ARTICLES.map((a, i) => (
          <div key={a.id} onClick={() => onArticle(a)} style={{
            borderRadius: 18,
            marginBottom: 16,
            overflow: "hidden",
            cursor: "pointer",
            height: i === 0 ? 220 : i === 1 ? 160 : 130,
            backgroundImage: `url(${a.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            flexShrink: 0,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%)",
              borderRadius: 18,
            }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: FONT, fontWeight: 400, marginBottom: 4, letterSpacing: 0.5 }}>{a.source.toUpperCase()}</div>
              <div style={{ color: "#fff", fontSize: i === 0 ? 16 : 14, fontWeight: 600, fontFamily: FONT, lineHeight: 1.3 }}>{a.title}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="knowledge" onNav={onNav} />
    </div>
  );
}

// 18. Article view
function ArticleScreen({ article, onBack, onNav }) {
  return (
    <div style={S.screen}>
      <button style={S.back} onClick={onBack}>‹</button>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <img src={article.image} alt={article.title} style={{ width: "100%", height: 240, objectFit: "cover" }} />
        <div style={{ padding: "24px 28px 40px" }}>
          <div style={{ textAlign: "right", marginBottom: 8 }}>
            <span style={S.logoSm}>νερό</span>
          </div>
          <h2 style={{ fontWeight: 700, fontSize: 19, marginBottom: 8, fontFamily: FONT, lineHeight: 1.4 }}>{article.title}</h2>
          <a href={article.url} style={{ ...S.muted, display: "block", marginBottom: 24, color: "#4a7a8a", textDecoration: "none", fontSize: 11 }}>{article.url}</a>
          {article.body.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.9, marginBottom: 18, fontFamily: FONT, fontWeight: 400, color: "#333" }}>{para}</p>
          ))}
        </div>
      </div>
      <BottomNav active="knowledge" onNav={onNav} />
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [prevScreen, setPrevScreen] = useState(null);
  const [logs, setLogs] = useState({});
  const [presets, setPresets] = useState(PRESETS);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [activeDate, setActiveDate] = useState(new Date(2026, 0, 8));
  const [newPresetBase, setNewPresetBase] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [resultsReadOnly, setResultsReadOnly] = useState(false);

  const go = (s, prev) => {
    if (prev !== undefined) setPrevScreen(prev);
    setScreen(s);
  };

  // Splash → onboarding after 2s
  useEffect(() => {
    if (screen === "splash") {
      const t = setTimeout(() => go("onboarding"), 2000);
      return () => clearTimeout(t);
    }
    if (screen === "submitted" || screen === "submitted_preset") {
      const t = setTimeout(() => go("home"), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const handleNav = (tab) => {
    if (tab === "home") go("home");
    if (tab === "insights") go("insights");
    if (tab === "presets") go("create_presets");
    if (tab === "knowledge") go("knowledge");
  };

  if (screen === "splash") return <SplashScreen />;
  if (screen === "onboarding") return <OnboardingScreen onDone={() => go("warning")} />;
  if (screen === "warning") return <WarningScreen onNext={() => go("getting_started")} />;
  if (screen === "getting_started") return <GettingStartedScreen onDone={() => go("home")} />;

  if (screen === "home") return (
    <HomeScreen logs={logs}
      onShower={date => { setActiveDate(date); go("preset_list"); }}
      onResults={(date, tab) => {
        if (tab) { handleNav(tab); return; }
        setActiveDate(date);
        setSelectedPreset(null);
        setResultsReadOnly(false);
        go("results");
      }} />
  );

  // Shower flow
  if (screen === "preset_list") return (
    <PresetListScreen presets={presets}
      onSelect={p => { setSelectedPreset(p); go("preset_selected_shower", "preset_list"); }}
      onBack={() => go("home")}
      onNav={handleNav} />
  );
  if (screen === "preset_selected_shower") return (
    <PresetSelectedScreen preset={selectedPreset}
      isPresetNav={false}
      onStart={p => { setSelectedPreset(p); go("connecting"); }}
      onSubmit={() => {}}
      onBack={() => go("preset_list")}
      onNav={handleNav} />
  );
  if (screen === "connecting") return (
    <ConnectingScreen onDone={() => go("countdown")} />
  );
  if (screen === "preset_selected") return (
    <PresetSelectedScreen preset={selectedPreset}
      isPresetNav={true}
      onStart={() => {}}
      onSubmit={() => go("submitted_preset")}
      onBack={() => go("create_presets")}
      onNav={handleNav} />
  );
  if (screen === "countdown") return (
    <CountdownScreen onDone={() => go("showering")} onCancel={() => go("home")} />
  );
  if (screen === "showering") return (
    <ShoweringScreen
      onResults={() => { setResultsReadOnly(false); go("results"); }}
      onCancel={() => go("home")} />
  );
  if (screen === "results") return (
    <ResultsScreen date={activeDate} logs={logs} setLogs={setLogs}
      preset={selectedPreset} showerTime={selectedPreset?.totalTime}
      readOnly={resultsReadOnly}
      onBack={() => go(prevScreen || "home")}
      onNav={handleNav}
      onSubmitted={() => go("submitted")} />
  );
  if (screen === "submitted") return <SubmittedScreen />;

  // Insights flow
  if (screen === "insights") return (
    <InsightsScreen logs={logs} onCalendar={() => go("calendar")} onNav={handleNav} />
  );
  if (screen === "calendar") return (
    <CalendarScreen logs={logs}
      onSelectDay={date => {
        setActiveDate(date);
        const key = dateKey(date);
        setResultsReadOnly(!!logs[key]?.submitted);
        go("results", "calendar");
      }}
      onBack={handleNav} />
  );

  // Preset creation flow
  if (screen === "create_presets") return (
    <CreatePresetListScreen presets={presets}
      onSelect={p => { setSelectedPreset(p); go("preset_selected", "create_presets"); }}
      onNew={() => go("new_preset_form")}
      onBack={() => go("home")}
      onNav={handleNav} />
  );
  if (screen === "new_preset_form") return (
    <NewPresetFormScreen
      onSubmit={base => { setNewPresetBase(base); go("new_preset_confirm"); }}
      onBack={() => go("create_presets")} />
  );
  if (screen === "new_preset_confirm") return (
    <NewPresetConfirmScreen basePreset={newPresetBase}
      onConfirm={p => {
        setPresets(prev => [...prev, { ...p, id: Date.now() }]);
        go("submitted_preset");
      }}
      onBack={() => go("new_preset_form")}
      onNav={handleNav} />
  );
  if (screen === "submitted_preset") return <SubmittedScreen />;

  // Knowledge flow
  if (screen === "knowledge") return (
    <KnowledgeListScreen onArticle={a => { setCurrentArticle(a); go("article"); }} onNav={handleNav} />
  );
  if (screen === "article") return (
    <ArticleScreen article={currentArticle} onBack={() => go("knowledge")} onNav={handleNav} />
  );

  return <SplashScreen />;
}
