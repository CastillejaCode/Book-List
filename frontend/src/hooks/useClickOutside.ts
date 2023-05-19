import { useEffect, useRef, useState } from "react";

export const useClickOutside = (initial: boolean, type: string) => {
  const ref = useRef<type>(null);

  const handleClickOutside = (event: React.SyntheticEvent) => {
    console.log(123);
    if (ref.current && !ref.current?.contains(event.target)) console.log(123);
    ref.current.close();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return document.removeEventListener("mousedown", handleClickOutside, true);
  }, []);

  return { ref };
};
