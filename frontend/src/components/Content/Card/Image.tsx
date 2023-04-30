import { useGetBookIdQuery } from "../../../services/books";
const Image = ({ title }: { title: string }) => {
  const { data: value, isLoading, isError } = useGetBookIdQuery(title);
  const key = "id";
  const size = "M";

  if (isLoading) return <div className="loading btn-square btn"></div>;
  if (isError) return <div>Image not returned</div>;
  // if (isSuccess) return <div>temp</div>;

  const imgSrc = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;

  return (
    <img
      src={imgSrc}
      alt={`$Book cover for ${title}`}
      className="aspect-[1/1.5] w-5/12 rounded-md border-2 border-gray-900"
    />
  );
};

export default Image;
