import { useState } from "react";
import { Book } from "../../types";
import {
  Cog6ToothIcon,
  StarIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Options from "./Options";

const OneBook = ({ book }: { book: Book }) => {
  const [reveal, setReveal] = useState(false);
  const [options, setOptions] = useState(false);

  const toggleReveal = () => {
    setReveal(!reveal);
  };

  const toggleOptions = () => {
    setOptions(!options);
  };

  return (
    <div
      className=" relative flex h-fit w-40 flex-col items-start rounded-md border-2 border-gray-800 bg-gray-100 p-4"
      key={book.id}
    >
      <h3 className="text-xl font-bold">{book.title}</h3>
      <h4 className="mb-4 text-left">{book.author}</h4>

      <Options id={book.id} options={options} />
      <Cog6ToothIcon
        className="absolute right-0 top-0 m-1 h-5 w-5 self-center opacity-70"
        onClick={toggleOptions}
      />
      <div className="flex flex-grow justify-center">
        {Array(book.rating)
          .fill(0)
          .map((_star, index) => {
            return <StarIcon className="h-5 w-5 text-orange-400" key={index} />;
          })}
      </div>
      <p className="text-left">{book.review}</p>
    </div>
  );
};

export default OneBook;
