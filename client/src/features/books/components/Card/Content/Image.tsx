import clsx from "clsx";
import { useImageContext } from "../imageContext";

interface Props {
  title: string;
  author: string;
  coverNumber: number;
}

const Image = ({ title, coverNumber }: Props) => {
  const { docs, isLoading, isError } = useImageContext();

  const value = docs?.at(coverNumber)?.cover_i;
  const key = "id";
  const size = "M";
  const imgSrc = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

  return (
    <img
      src={isError ? "book-open.svg" : imgSrc}
      alt={`Book cover for ${title}`}
      className={clsx(
        "aspect-[1/1.5] w-5/12 rounded-md border-2 border-gray-700",
        isLoading && "loading"
      )}
    />
  );
};

export default Image;
