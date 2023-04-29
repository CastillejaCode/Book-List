interface Props {
  review: string;
  showReview: boolean;
}

const Review = ({ review, showReview }: Props) => {
  return (
    <div
      className={` rounded-lg  p-2 pl-4 shadow-md transition-all duration-300 ${
        !showReview ? "-translate-y-20 scale-95" : ""
      }`}
    >
      <p className="">"{review}"</p>
    </div>
  );
};

export default Review;
