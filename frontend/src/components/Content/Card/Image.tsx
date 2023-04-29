import { useGetBookIdQuery } from "../../../services/books";
const Image = ({ title }: { title: string }) => {
  const { data: value, isLoading, isError } = useGetBookIdQuery(title);
  const key = "id";
  const size = "M";

  if (isLoading) return <div className="loading"></div>;
  if (isError) return <div>Image not returned</div>;

  console.log(value);

  const imgSrc = `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;
  console.log(imgSrc);

  return (
    <img
      src={imgSrc}
      alt={`$Book cover for ${title}`}
      className="h-full w-20"
    />
  );
};

export default Image;
