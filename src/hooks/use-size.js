import { useState, useEffect } from 'react';

export function useSize(ref) {
  const [size, setSize] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleResize = () => {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return size;
}
