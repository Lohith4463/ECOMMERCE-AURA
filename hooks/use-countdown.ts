"use client";

import { useEffect, useState } from "react";

export function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    setRemaining(Math.max(0, new Date(target).getTime() - Date.now()));

    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, new Date(target).getTime() - Date.now()));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return { days, hours, minutes, seconds };
}
