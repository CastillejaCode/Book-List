interface Props {
  review: string;
}

const Review = ({ review }: Props) => {
  return <p>"{review}"</p>;
};

export default Review;
