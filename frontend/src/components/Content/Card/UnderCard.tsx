interface Props {
  showReview?: boolean;
  showOptions?: boolean;
  height?: number;
  children: React.ReactNode;
}
// BUG: Height isn't inserting sometimes

const UnderCard = ({ showReview, showOptions, height, children }: Props) => {
  return (
    <div
      className={`absolute top-0 -z-50 w-full rounded-lg border-2 border-gray-500/70 bg-gray-50 p-2 shadow-md transition-all duration-300 ${
        showReview || showOptions
          ? `top-${height} z-0 mt-3`
          : "border-gray500/10"
      }`}
    >
      {children}
    </div>
  );
};

export default UnderCard;
