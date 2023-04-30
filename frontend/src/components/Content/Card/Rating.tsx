import { StarIcon } from "@heroicons/react/24/outline";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className="absolute bottom-1 right-1 flex flex-grow items-center justify-end self-end">
      {rating}
      <StarIcon className="aspect-square w-4" />
    </div>
  );
};

export default Rating;
