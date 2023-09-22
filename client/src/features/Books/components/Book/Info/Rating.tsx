import { StarIcon } from "@heroicons/react/24/outline";

const Rating = ({ rating }: { rating: number }) => {
  return (
    <div>
      <div className="absolute bottom-0 right-0 m-2 flex">{rating}</div>
    </div>
  );
};

export default Rating;
