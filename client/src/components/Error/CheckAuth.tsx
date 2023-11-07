import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";
import ErrorPage from "./ErrorPage";

interface Props {
  children: React.ReactNode;
}

export default function CheckAuth({ children }: Props) {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) return <div>loaduing</div>;
  if (!user) return <ErrorPage suppliedError={"No Authentication"} />;

  return <>{children}</>;
}
