import { useEffect, useState } from 'react';

// ✅ Curated trust messages with icons
const TRUST_MESSAGES = [
  { icon: "📦", text: "38 moves coordinated in the past 7 days" },
  { icon: "✅", text: "12 new bookings confirmed today" },
  { icon: "🚛", text: "3 cross-country moves picked up this morning" },
  { icon: "🧭", text: "Over 4,200 miles scheduled for transport this week" },
  { icon: "🎹", text: "2 piano moves and 6 senior relocations booked today" },
  { icon: "🌎", text: "Teams are currently active in 9 different states" },
  { icon: "📍", text: "Pickup routes are being dispatched hourly" },
  { icon: "📑", text: "5 families finalized their quote this morning" },
  { icon: "📈", text: "Midweek bookings are surging — 40+ this week already" },
  { icon: "🗺️", text: "4 back-to-back moves routed through Texas today" },
  { icon: "📊", text: "150+ moves coordinated monthly on average" },
  { icon: "🏠", text: "Over 1,800 families relocated nationwide" },
  { icon: "🧳", text: "Moves scheduled into November and beyond" },
  { icon: "📦", text: "30–40 families trust us every week" },
  { icon: "📅", text: "August is 88% booked — limited availability" },
  { icon: "📅", text: "September is filling faster than projected" },
  { icon: "⚠️", text: "High-demand routes are closing out early" },
  { icon: "⏱️", text: "Most customers reserve within 48 hours" },
  { icon: "🛡️", text: "Flat-rate pricing — no surprises" },
  { icon: "⭐", text: "Rated 4.9 out of 5 by verified customers" },
  { icon: "🙋", text: "Live support from real humans — not just AI" },
  { icon: "🔒", text: "Licensed carriers. Verified movers. Protected quotes." },
  { icon: "🧠", text: "Every quote is reviewed by a human" },
  { icon: "🔧", text: "We specialize in long-distance logistics" },
  { icon: "🗂️", text: "One point of contact from quote to delivery" },
  { icon: "📞", text: "Phone support available before, during, and after your move" },
  { icon: "🧼", text: "Clean, single-use materials for each move" },
  { icon: "📦", text: "Extra protection available for TVs, artwork, and antiques" },
  { icon: "📣", text: "Real people are booking every hour" },
  { icon: "🚚", text: "Fleet-ready. Route-optimized. On time." }
];

// 🔁 Shuffle once per session
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function LiveTrustStatus() {
  const [shuffled, setShuffled] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setShuffled(shuffleArray(TRUST_MESSAGES));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % shuffled.length);
        setFade(true);
      }, 400); // Fade out before switching
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [shuffled]);

  if (!shuffled.length) return null;

  return (
    <div style={styles.wrapper}>
      <div style={{ ...styles.message, opacity: fade ? 1 : 0 }}>
        <span style={styles.icon}>{shuffled[index].icon}</span>
        <span style={styles.text}>{shuffled[index].text}</span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#eaeaea', // ✅ Neutral grey
    padding: '10px 18px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    margin: '0 auto',
    maxWidth: '480px',
    minHeight: '40px',
    transition: 'all 0.3s ease-in-out',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'opacity 0.4s ease-in-out',
  },
  icon: {
    fontSize: '18px',
  },
  text: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#222',
    lineHeight: '1.4',
  }
};
