import { useEffect, useState } from 'react';

const TRUST_MESSAGES = [
  "38 moves coordinated in the past 7 days",
  "12 new bookings confirmed today",
  "3 cross-country moves picked up this morning",
  "Over 4,200 miles scheduled for transport this week",
  "2 piano moves and 6 senior relocations booked today",
  "Teams are currently active in 9 different states",
  "Pickup routes are being dispatched hourly",
  "5 families finalized their quote this morning",
  "Midweek bookings are surging — 40+ this week already",
  "4 back-to-back moves routed through Texas today",
  "150+ moves coordinated monthly on average",
  "Over 1,800 families relocated nationwide",
  "Moves scheduled into November and beyond",
  "30–40 families trust us every week",
  "August is 88% booked — limited availability",
  "September is filling faster than projected",
  "High-demand routes are closing out early",
  "Most customers reserve within 48 hours",
  "Flat-rate pricing — no surprises",
  "Rated 4.9 out of 5 by verified customers",
  "Live support from real humans — not just AI",
  "Licensed carriers. Verified movers. Protected quotes.",
  "Every quote is reviewed by a human",
  "We specialize in long-distance logistics",
  "One point of contact from quote to delivery",
  "Phone support available before, during, and after your move",
  "Clean, single-use materials for each move",
  "Extra protection available for TVs, artwork, and antiques",
  "Real people are booking every hour",
  "Fleet-ready. Route-optimized. On time.",
];

// Shuffle once per session
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
    }, 8000);

    return () => clearInterval(interval);
  }, [shuffled]);

  if (!shuffled.length) return null;

  return (
    <div style={{ ...styles.wrapper, ...styles.fade }}>
      <span style={styles.text}>{shuffled[index]}</span>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Inter", sans-serif',
    fontSize: '17px',
    fontWeight: 500,
    color: '#222',
    padding: '10px 20px',
    margin: '4px auto 0',
    maxWidth: '96%',
    background: 'rgba(240, 240, 240, 0.85)', // Light grey background
    borderRadius: '10px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)',
    transition: 'opacity 0.6s ease-in-out',
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',
    minHeight: '38px',
    textAlign: 'center',
  },
  text: {
    lineHeight: '1.5',
  },
  fade: {
    animation: 'fadeInOut 8s infinite',
  },
};
