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
      src={value ? imgSrc : "mstile-310x310.png"}
      alt={`Book cover for ${title}`}
      className={clsx(
        "aspect-[1/1.5]  rounded-md border-2 border-gray-700",
        isLoading && "loading"
      )}
    />
  );
}
