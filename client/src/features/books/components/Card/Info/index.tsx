import { useState } from "react";
import { Book } from "src/types";
import Rating from "./Rating";
import moby from "/moby.jpg";

interface Props {
  book: Book;
}

export default function Info({ book }: Props) {
  const [rating, setRating] = useState(book.rating);

  return (
    <>
      <div className="first-letter: modal-box flex flex-col gap-8">
        <form method="dialog" className="absolute right-2 top-2">
          <button className="btn-ghost btn-sm btn-circle btn ">✕</button>
        </form>
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-semibold">{book.title}</h1>
            <h2 className="text-2xl">{book.author}</h2>
          </div>
          <Rating rating={rating} setRating={setRating} />
        </div>
        <img src={moby} alt="" />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
}
