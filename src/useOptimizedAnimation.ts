// useOptimizedAnimation.ts
import { useRef, useEffect, useCallback } from 'react';

export const useOptimizedAnimation = () => {
    const rafId = useRef<number | null>(null);

    const animateWithRAF = useCallback((callback: () => void) => {
        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }
        
        rafId.current = requestAnimationFrame(() => {
            callback();
        });
    }, []);

    useEffect(() => {
        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return { animateWithRAF };
};