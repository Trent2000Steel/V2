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

  useEffect(() => {
    setShuffled(shuffleArray(TRUST_MESSAGES));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % shuffled.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [shuffled]);

  if (!shuffled.length) return null;

  return (
    <div style={styles.wrapper}>
      <span style={styles.icon}>{shuffled[index].icon}</span>
      <span>{shuffled[index].text}</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: '#f0f7ff', // 🔵 subtle blue background for trust
    borderRadius: '6px',
    padding: '8px 14px',
    fontSize: '15px', // ⬆️ Increased for legibility
    fontWeight: '500',
    color: '#333',
    minHeight: '32px',
    textAlign: 'center',
    lineHeight: '1.4',
  },
  icon: {
    fontSize: '16px',
  }
};
