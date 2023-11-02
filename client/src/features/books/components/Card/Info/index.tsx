import { Book } from "src/types";
import moby from "/moby.jpg";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

interface Props {
  book: Book;
}

export default function Info({ book }: Props) {
  const [rating, setRating] = useState(book.rating);
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
    <>
      <div className="first-letter: modal-box flex flex-col gap-8">
        <form method="dialog" className="absolute right-2 top-2">
          <button className="btn-ghost btn-sm btn-circle btn ">✕</button>
        </form>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-semibold">{book.title}</h1>
            <h2 className="text-2xl ">{book.author}</h2>
          </div>
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
        </div>
        <img src={moby} alt="" className=" " />
        <p>{rating}</p>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
