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
      className={`absolute top-0 -z-50 w-full rounded-lg border-2 border-gray-500/70 bg-gray-50 p-2 shadow-sm transition-all duration-300 ${
        showReview || showOptions
          ? `translate-y-${height} z-0 mt-10`
          : "shadow-none"
      }`}
    >
      {children}
    </div>
  );
};

export default UnderCard;
