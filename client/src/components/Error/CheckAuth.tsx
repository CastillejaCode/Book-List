import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";
import ErrorPage from "./ErrorPage";
import Loading from "../Loading";

interface Props {
  children: React.ReactNode;
}

export default function CheckAuth({ children }: Props) {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) return <Loading />;
  if (!user) return <ErrorPage suppliedError={"No Authentication"} />;

  return <>{children}</>;
}
