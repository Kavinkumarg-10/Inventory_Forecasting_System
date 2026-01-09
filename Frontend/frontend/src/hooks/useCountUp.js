import { useEffect, useState } from "react";

export default function useCountUp(value, duration = 2000) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    let startTime = null;

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      setDisplay(Math.floor(eased * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value, duration]);

  return display;
}
