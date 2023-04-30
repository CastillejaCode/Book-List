interface Props {
  review: string;
  showReview: boolean;
  height: number;
}

const Review = ({ review, showReview, height }: Props) => {
  return (
    <div
      className={`absolute top-0 -z-50 w-full rounded-lg border-2 border-gray-500/70 bg-gray-50 p-2 shadow-md transition-all duration-300 ${
        showReview ? `translate-y-${height} mt-2 ` : "scale-95"
      }`}
    >
      <p>"{review}"</p>
    </div>
  );
};

export default Review;
