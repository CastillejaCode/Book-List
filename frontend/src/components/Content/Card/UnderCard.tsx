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
      className={`absolute -z-50 w-full  p-2 shadow-sm transition-all duration-300 
      ${showReview || showOptions ? `top-52 z-0 mt-10` : "top-0 shadow-none"}
      ${showReview && "rounded-lg border-2 border-gray-500/70 bg-gray-50"}
      `}
    >
      {children}
    </div>
  );
};

export default UnderCard;
