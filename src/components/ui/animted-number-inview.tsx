'use client';
import { AnimatedNumber } from '~/components/core/animated-number';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function AnimatedNumberInView({ from = 0, to, duration }: { from?: number, to: number, duration: number }) {
  const [value, setValue] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref);

  if (isInView && value === from) {
    setValue(to);
  }

  return (
    <span ref={ref}>
      <AnimatedNumber
        className='font-mono text-primary'
        springOptions={{
          bounce: 0,
          duration: duration,
        }}
        value={value}
      />
    </span>
  );
}
