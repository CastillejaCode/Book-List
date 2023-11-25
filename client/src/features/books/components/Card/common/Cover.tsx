import clsx from "clsx";
import { useImageContext } from "../imageContext";

interface Props {
  title: string;
  coverNumber: number;
  size: "S" | "M" | "L";
}

export default function Cover({ title, coverNumber, size }: Props) {
  const { docs, isLoading } = useImageContext();

  const value = docs?.at(coverNumber)?.cover_i;
  const key = "id";
  const imgSrc = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

  return (
    <img
      src={value ? imgSrc : "book-open.svg"}
      alt={`Book cover for ${title}`}
      className={clsx(
        "aspect-[1/1.5] rounded-md border-2 border-gray-700",
        isLoading && "loading",
        // I'm throwing this here so I don't have to add more props to fix the sizing issue
        size === "M" && "w-[8rem]"
      )}
    />
  );
}
