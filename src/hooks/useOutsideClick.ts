import { useEffect, RefObject } from "react";

/**
 * 要素外のクリックを検知するHooks
 * @param ref 対象とする要素のref
 * @param onClick ref以外をclickした時に発火
 */
export const useOutsideClick = <T extends Node>(
  ref: RefObject<T>,
  onClick: () => void
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const inside = ref.current?.contains(event.target as Node);
      if (inside) return;

      onClick();
    };
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref, onClick]);
};
