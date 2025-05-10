import { useTransitionStore } from '@/store/transitionStore';
import { useEffect, useRef } from 'react';

export function useFunnelDirection(currentStep: string) {
  const { setDirection } = useTransitionStore();
  const prevStep = useRef(currentStep);

  useEffect(() => {
    const handlePopState = () => {
      setDirection('backward');
    };

    window.addEventListener('popstate', handlePopState);

    if (prevStep.current !== currentStep) {
      setDirection('forward');
      prevStep.current = currentStep;
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep, setDirection]);
}
