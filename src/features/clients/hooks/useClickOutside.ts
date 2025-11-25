import { useEffect } from "react";

type HTMLElementRef = { current: HTMLElement | null };

export function useClickOutside(ref: HTMLElementRef, callback: () => void) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, callback]);
}
