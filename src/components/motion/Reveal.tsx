'use client';

import { motion, type Variants } from 'framer-motion';
import { EASE, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';

type Direction = 'up' | 'down' | 'start' | 'end' | 'none';

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 22 },
  down: { y: -22 },
  start: { x: -32 },
  end: { x: 32 },
  none: {},
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  as = 'div',
  skipAnimation = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: 'div' | 'span' | 'li' | 'section';
  /** Render fully visible immediately — for contexts where whileInView can't
   * fire correctly, e.g. a preview pane that isn't the real page viewport. */
  skipAnimation?: boolean;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: EASE } },
  };
  const MotionTag = motion[as];
  if (skipAnimation) {
    return <MotionTag className={cn(className)} variants={variants} initial="show" animate="show">{children}</MotionTag>;
  }
  return (
    <MotionTag className={cn(className)} variants={variants} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  skipAnimation = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  skipAnimation?: boolean;
}) {
  const variants = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } };
  if (skipAnimation) {
    return <motion.div className={cn(className)} initial="show" animate="show" variants={variants}>{children}</motion.div>;
  }
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
  duration = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  duration?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offset[direction] },
    show: { opacity: 1, x: 0, y: 0, transition: { duration, ease: EASE } },
  };
  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}
