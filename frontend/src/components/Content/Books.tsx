import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "./queries";

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  return <div></div>;
};

export default Books;
