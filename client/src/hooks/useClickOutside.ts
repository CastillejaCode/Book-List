import { useEffect } from "react";

const useClickOutside = (
  action: () => void,
  ref: React.RefObject<HTMLElement>
) => {
  const handleClickOutside = (e: MouseEvent) => {
    const event = e.target as Node;
    if (ref.current && !ref.current.contains(event)) action();
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
};

export default useClickOutside;
