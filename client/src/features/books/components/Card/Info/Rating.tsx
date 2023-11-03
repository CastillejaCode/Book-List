import { SetStateAction, SyntheticEvent, useEffect, useRef } from "react";

interface Props {
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
}

export default function Rating({ rating, setRating }: Props) {
  const handleRating = (event: SyntheticEvent) => {
    const e = event.target as HTMLInputElement;
    setRating(Number(e.value));
  };
  return <div className="flex gap-4"></div>;
}
