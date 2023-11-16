import { useEffect } from "react";

export default function useExit(
  action: () => void,
  ref: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const event = e.target as Node;
      if (ref.current && !ref.current.contains(event)) action();
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") action();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClick);
    };
  }, [action, ref]);
}
