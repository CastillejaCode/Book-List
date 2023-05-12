import { useGetBookIdQuery } from "../../../services/books";
import { BookOpenIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  author: string;
  coverNumber: number;
}

const Image = ({ title, author, coverNumber }: Props) => {
  const {
    data: value,
    isLoading,
    isError,
  } = useGetBookIdQuery({ title, author });

  if (isLoading)
    return (
      <div className="loading btn-square btn mr-4 aspect-[1/1.5] h-full w-5/12 rounded-md border-2 border-gray-900"></div>
    );
  if (isError || !value)
    return (
      <div className="mr-4 flex aspect-[1/1.5] w-5/12 justify-center rounded-md border-2 border-gray-900">
        <BookOpenIcon />
      </div>
    );

  // Image options
  const key = "id";
  const size = "M";
  const imgSrc = (id = 0) =>
    `https://covers.openlibrary.org/b/${key}/${value[id].cover_i}-${size}.jpg`;

  return (
    <img
      src={imgSrc(coverNumber)}
      alt={`$Book cover for ${title}`}
      className="mr-4 aspect-[1/1.5] w-5/12 rounded-md border-2 border-gray-700"
    />
  );
};

export default Image;
