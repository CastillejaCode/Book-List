import { SetStateAction, SyntheticEvent, useEffect, useRef } from "react";

interface Props {
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
}

export default function Rating({ rating, setRating }: Props) {
  const ratingRef = useRef<HTMLDivElement>(null);

  // Set the initial amount of hearts
  useEffect(() => {
    ratingRef.current
      ?.querySelectorAll("input")
      .forEach((e) => Number(e.value) === rating && (e.checked = true));
  }, []);

  const handleRating = (event: SyntheticEvent) => {
    const e = event.target as HTMLInputElement;
    setRating(Number(e.value));
  };
  return (
    <div className="rating gap-1" onChange={handleRating} ref={ratingRef}>
      <input
        type="radio"
        name="rating-3"
        value={1}
        className="mask mask-heart bg-red-400"
      />
      <input
        type="radio"
        name="rating-3"
        value={2}
        className="mask mask-heart bg-orange-400"
      />
      <input
        type="radio"
        name="rating-3"
        value={3}
        className="mask mask-heart bg-yellow-400"
      />
      <input
        type="radio"
        name="rating-3"
        value={4}
        className="mask mask-heart bg-lime-400"
      />
      <input
        type="radio"
        name="rating-3"
        value={5}
        className="mask mask-heart bg-green-400"
      />
      <p className="pl-2">{rating}</p>
    </div>
  );
}
