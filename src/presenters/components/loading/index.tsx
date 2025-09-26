import { useEffect, useState } from 'react';
import { HourglassHigh } from 'phosphor-react';

const Loading = () => {
  const [angle, setAngle] = useState(0);
  const [direction, setDirection] = useState(1);
  const maxAngle = 15;
  const speed = 0.5;

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setAngle(prev => {
        let next = prev + direction * speed;
        if (next > maxAngle) {
          next = maxAngle;
          setDirection(-1);
        } else if (next < -maxAngle) {
          next = -maxAngle;
          setDirection(1);
        }
        return next;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [direction]);

  return (
    <div
      className="flex justify-center items-center"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <HourglassHigh size={32} weight="bold" />
    </div>
  );
};

export default Loading;
