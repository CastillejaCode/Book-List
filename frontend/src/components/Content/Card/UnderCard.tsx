interface Props {
  showReview?: boolean;
  showOptions?: boolean;
  height?: number;
  children: React.ReactNode;
}
// BUG: Height isn't inserting sometimes

const UnderCard = ({ showReview, showOptions, height, children }: Props) => {
  const style =
    showReview || showOptions ? { transform: `translateY(${height}px)` } : {};

  return (
    <div
      style={style}
      className={`absolute top-0 -z-50 w-full p-2 shadow-sm transition-all  duration-300
      ${showReview || showOptions ? `z-0 mt-5` : `transform-none shadow-none`}
      ${showReview && "rounded-lg border-2 border-gray-500/70 bg-gray-50"}
      `}
    >
      {children}
    </div>
  );
};

export default UnderCard;
