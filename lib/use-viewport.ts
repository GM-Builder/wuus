'use client';
import { useSyncExternalStore } from 'react';
const subscribe = (notify: () => void) => {
  window.addEventListener('resize', notify);
  return () => window.removeEventListener('resize', notify);
};
export function useViewportWidth() {
  return useSyncExternalStore(subscribe, () => window.innerWidth, () => 1280);
}
