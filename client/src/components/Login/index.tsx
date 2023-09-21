import CreateForm from "./Form/CreateForm";
import LoginForm from "./Form/LoginForm";
import ResetPasswordForm from "./Form/ResetPasswordForm";
import Form from "./Form";
import Error from "./Error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AnimatePresence } from "framer-motion";

const Login = () => {
  const showCreate = useSelector((state: RootState) => state.toggle.create);
  const showResetPassword = useSelector(
    (state: RootState) => state.toggle.resetPassword
  );
  const error = useSelector((state: RootState) => state.notification.error);
  const notif = useSelector((state: RootState) => state.notification.notif);

  return (
    <div className="relative flex h-screen flex-col items-center">
      <div className="relative m-4 mb-24 w-fit">
        <h1 className="text-4xl">TomeTracker</h1>
      </div>
      <Form>
        {showResetPassword ? (
          <ResetPasswordForm />
        ) : showCreate ? (
          <CreateForm />
        ) : (
          <LoginForm />
        )}
      </Form>
      <AnimatePresence>
        {error || notif ? <Error key="error" /> : ""}
      </AnimatePresence>
    </div>
  );
};

export default Login;
