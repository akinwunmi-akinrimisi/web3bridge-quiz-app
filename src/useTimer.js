import { useState, useEffect } from "react";

const useTimer = (initialTime) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when time runs out

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1); // Decrease by 1 second
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return [timeLeft, setTimeLeft];
};

export default useTimer;
