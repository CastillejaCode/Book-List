import { Book } from "../../../types";
import Image from "./Image";

const Card = ({ book }: { book: Book }) => {
  // const [reveal, setReveal] = useState(false);
  // const [options, setOptions] = useState(false);

  return (
    <div className="flex h-40 w-11/12 items-center rounded-lg border-2 p-4 shadow-md">
      <Image title={book.title} />
    </div>
  );
};

export default Card;
