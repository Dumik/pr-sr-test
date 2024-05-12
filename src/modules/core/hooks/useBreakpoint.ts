'use client';
import { useEffect, useState } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const useBreakpoint = (size: Breakpoint) => {
  const [isMatched, setIsMatched] = useState(false);

  const breakpoints: Record<Breakpoint, { min: number; max: number }> = {
    xs: { min: 0, max: 575 },
    sm: { min: 0, max: 767 },
    md: { min: 0, max: 991 },
    lg: { min: 0, max: 1199 },
    xl: { min: 0, max: 1399 },
    xxl: { min: 1400, max: Infinity },
  };

  const handleResize = () => {
    const width = window.innerWidth;
    setIsMatched(getIsMatched(width, size));
  };

  const getIsMatched = (width: number, size: Breakpoint) => {
    const { min, max } = breakpoints[size];
    return width >= min && width <= max;
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMatched;
};

export default useBreakpoint;
