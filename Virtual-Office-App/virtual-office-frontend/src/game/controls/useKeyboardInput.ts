import { useEffect, useRef } from 'react';

type KeyMap = Record<string, boolean>;

// Tracks which keys are currently held down.
//
// We use a ref (not state) so that reading keys inside useFrame doesn't
// cause any React re-renders — it's just a plain object lookup.
//
// We also skip input when the user is typing in a text field,
// so WASD doesn't move the avatar while chatting.
export const useKeyboardInput = (): React.RefObject<KeyMap> => {
  const keysRef = useRef<KeyMap>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void => {
      if (isTypingInField(e)) return;
      // Prevent the browser from scrolling the page with arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      keysRef.current[e.code] = true;
    };

    const onKeyUp = (e: KeyboardEvent): void => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Clear all keys on blur so the avatar doesn't run forever if window loses focus
    const onBlur = (): void => { keysRef.current = {}; };
    window.addEventListener('blur', onBlur);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return keysRef;
};

const isTypingInField = (e: KeyboardEvent): boolean =>
  e.target instanceof HTMLInputElement ||
  e.target instanceof HTMLTextAreaElement;
