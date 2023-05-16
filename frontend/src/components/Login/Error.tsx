import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Error = () => {
  const error = useSelector((state: RootState) => {
    const error = state.error.value;
    if (!error) return;
    return error.split("/").slice(1).at(0)?.split("-").join(" ");
  });

  return <p className="rounded-lg bg-red-300 p-4 text-2xl">{error}</p>;
};

export default Error;
