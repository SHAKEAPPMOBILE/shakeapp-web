'use client';

import { createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: '0px 0px -200px' };

export function FadeIn({
    children,
    className,
    delay = 0,
    direction = 'up',
    fullWidth = false,
    padding = true,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
    padding?: boolean;
}) {
    const shouldReduceMotion = useReducedMotion();
    const isInStaggerGroup = useContext(FadeInStaggerContext);

    const initHidden = {
        opacity: 0,
        x: direction === 'left' ? 24 : direction === 'right' ? -24 : 0,
        y: direction === 'up' ? 24 : direction === 'down' ? -24 : 0,
    };

    return (
        <motion.div
            variants={{
                hidden: initHidden,
                visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } // Custom easing for premium feel
                },
            }}
            transition={{
                delay: isInStaggerGroup ? 0 : delay, // If in stagger group, let parent handle delay
            }}
            {...(isInStaggerGroup
                ? {}
                : {
                    initial: 'hidden',
                    whileInView: 'visible',
                    viewport,
                })}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto' }}
        >
            {children}
        </motion.div>
    );
}

export function FadeInStagger({
    children,
    faster = false,
    className,
}: {
    children: React.ReactNode;
    faster?: boolean;
    className?: string;
}) {
    return (
        <FadeInStaggerContext.Provider value={true}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
                className={className}
            >
                {children}
            </motion.div>
        </FadeInStaggerContext.Provider>
    );
}
