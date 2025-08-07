import { useEffect, useState } from 'react';

// Curated trust lines (rotated randomly per session)
const TRUST_MESSAGES = [
  // 📦 Live Activity
  "38 moves coordinated in the past 7 days",
  "12 new bookings confirmed today",
  "3 cross-country moves picked up this morning",
  "Over 4,200 miles scheduled for transport this week",
  "2 piano moves and 6 senior relocations booked today",
  "Teams are currently active in 9 different states",
  "Pickup routes are being dispatched hourly",
  "5 families finalized their long-distance quote this morning",
  "Midweek bookings are surging — 40+ this week already",
  "4 back-to-back moves routed through Texas today",

  // 🔁 Consistency & Scale
  "150+ moves coordinated monthly on average",
  "We’ve helped over 1,800 families relocate nationwide",
  "Coordinating moves across 20+ states each month",
  "High-volume weeks? We’re built for them.",
  "Moves scheduled into November and beyond",
  "Fleet-ready and route-planned seven days a week",
  "30–40 families trust us every week to move them long-distance",

  // 🚨 Urgency & Demand
  "August is 88% booked — limited availability",
  "September is filling faster than projected",
  "Weekend slots go first — ask about weekdays",
  "High-demand routes are closing out early",
  "Most customers reserve their move within 48 hours of quoting",
  "A delay of one day can affect your preferred delivery window",
  "Preferred pickup windows book out 7–14 days in advance",

  // ⭐ Reviews / Confidence
  "Rated 4.9 out of 5 by verified customers",
  "No bait-and-switch pricing — every quote is manually reviewed",
  "Zero-damage deliveries reported on 94% of moves this year",
  "You get one coordinator. One quote. No runaround.",
  "Live support from real humans — not just AI",
  "Licensed carriers. Verified movers. Flat-rate protection."
];

// Shuffle messages once per session
function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function LiveTrustStatus() {
  const [shuffledMessages, setShuffledMessages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setShuffledMessages(shuffleArray(TRUST_MESSAGES));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % shuffledMessages.length);
    }, 8000); // 8 seconds per message

    return () => clearInterval(interval);
  }, [shuffledMessages]);

  if (!shuffledMessages.length) return null;

  return (
    <div style={styles.wrapper}>
      {shuffledMessages[index]}
    </div>
  );
}

const styles = {
  wrapper: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#555',
    marginBottom: '8px',
    minHeight: '20px',
    transition: 'opacity 0.3s ease',
  }
};
