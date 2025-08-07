import { useEffect, useState } from 'react';

function getMonthName(offset = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return date.toLocaleString('default', { month: 'long' });
}

function getBookingPercentage(monthOffset) {
  const base = 40 + monthOffset * 15;
  const variation = Math.floor(Math.random() * 10);
  return Math.min(base + variation, 98);
}

export default function LiveTrustStatus() {
  const [messageIndex, setMessageIndex] = useState(0);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const currentMonth = getMonthName(0);
    const nextMonth = getMonthName(1);
    const futureMonth = getMonthName(3);

    const bookingStats = [
      `${currentMonth} is ${getBookingPercentage(0)}% booked — limited availability`,
      `${nextMonth} is ${getBookingPercentage(1)}% booked`,
      `${futureMonth} is already ${getBookingPercentage(3)}% reserved`
    ];

    const trustAndReviews = [
      "📦 19 families booked their move in the last 30 days",
      "⭐ Rated 4.9 out of 5 by real customers",
      "💬 “Max was a godsend during our cross-country move.” – Briana T.",
      "💬 “Booking was simple and smooth. Price was spot on.” – Jorge R.",
      "💬 “Best move experience we’ve ever had.” – Darlene M."
    ];

    setMessages([...bookingStats, ...trustAndReviews]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Rotate every 8 seconds

    return () => clearInterval(interval);
  }, [messages]);

  if (!messages.length) return null;

  return (
    <div style={{
      textAlign: 'center',
      fontSize: '13px',
      color: '#555',
      marginBottom: '8px',
      transition: 'opacity 0.3s ease',
    }}>
      {messages[messageIndex]}
    </div>
  );
}
