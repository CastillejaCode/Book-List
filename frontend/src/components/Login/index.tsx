import CreateForm from "./Form/CreateForm";
import LoginForm from "./Form/LoginForm";
import Form from "./Form";
import Error from "./Error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AnimatePresence } from "framer-motion";

const Login = () => {
  const showCreate = useSelector((state: RootState) => state.toggle.create);
  const error = useSelector((state: RootState) => state.error.value);

  return (
    <div className="relative flex h-screen flex-col items-center">
      <div className="relative m-4 mb-24 w-fit">
        <AnimatePresence>
          <h1 className="text-4xl">BookL:</h1>
          {error && <Error key="error" />}
        </AnimatePresence>
      </div>

      <Form>{!showCreate ? <LoginForm /> : <CreateForm />}</Form>
    </div>
  );
};

export default Login;
