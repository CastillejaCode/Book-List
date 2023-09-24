interface Props {
  showReview?: boolean;
  showOptions?: boolean;
  showImageControls?: boolean;
  height?: number;
  children: React.ReactNode;
}

const UnderCard = ({
  showReview,
  showOptions,
  showImageControls,
  height,
  children,
}: Props) => {
  const style =
    showReview || showOptions || showImageControls
      ? { transform: `translateY(${height}px)` }
      : {};

  return (
    <div
      style={style}
      className={`absolute top-0 -z-10 w-full p-2 transition-all duration-300
      ${
        showReview || showOptions || showImageControls
          ? ` mt-5`
          : `transform-none shadow-none`
      }
      ${
        showReview &&
        "rounded-lg border-2 border-zinc-700 bg-zinc-100 shadow-sm dark:bg-zinc-900"
      }
      `}
    >
      {children}
    </div>
  );
};

export default UnderCard;
