import React, { useEffect, useRef, useState } from 'react';
import { initDualCursor } from '../animations/cursor';
import { isTouchDevice } from '../animations/animationConfig';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const checkDisabled = () => {
      const isTouch = isTouchDevice();
      setDisabled(isTouch);
      return isTouch;
    };

    if (checkDisabled()) return;

    const cleanup = initDualCursor(dotRef.current, ringRef.current, textRef.current);

    const handleResize = () => {
      checkDisabled();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanup();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (disabled) return null;

  return (
    <>
      {/* Primary Precision Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-caramel-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Secondary Lagging Follower Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-cream-300/30 flex items-center justify-center font-sans text-[11px] font-bold tracking-widest uppercase overflow-hidden"
        style={{ width: 32, height: 32, transform: 'translate(-50%, -50%)' }}
      >
        <span ref={textRef} className="pointer-events-none select-none" />
      </div>
    </>
  );
};

export default CustomCursor;
