'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

function getEndDate(): Date {
  // Promocja kończy się jutro o 23:59:59
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 1);
  end.setHours(23, 59, 59, 999);
  return end;
}

export default function CountdownTimer({ className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const endDate = getEndDate();

    const tick = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="text-red-600 font-bold text-sm animate-pulse">🔥 Promocja kończy się za:</span>
      <div className="flex items-center gap-1">
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-center min-w-[2.5rem]">
          <span className="text-lg font-bold leading-none">{pad(timeLeft.days)}</span>
          <span className="block text-[9px] uppercase tracking-wider opacity-80">dni</span>
        </div>
        <span className="text-red-600 font-bold text-lg">:</span>
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-center min-w-[2.5rem]">
          <span className="text-lg font-bold leading-none">{pad(timeLeft.hours)}</span>
          <span className="block text-[9px] uppercase tracking-wider opacity-80">godz</span>
        </div>
        <span className="text-red-600 font-bold text-lg">:</span>
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-center min-w-[2.5rem]">
          <span className="text-lg font-bold leading-none">{pad(timeLeft.minutes)}</span>
          <span className="block text-[9px] uppercase tracking-wider opacity-80">min</span>
        </div>
        <span className="text-red-600 font-bold text-lg">:</span>
        <div className="bg-red-600 text-white rounded-md px-2 py-1 text-center min-w-[2.5rem]">
          <span className="text-lg font-bold leading-none">{pad(timeLeft.seconds)}</span>
          <span className="block text-[9px] uppercase tracking-wider opacity-80">sek</span>
        </div>
      </div>
    </div>
  );
}
