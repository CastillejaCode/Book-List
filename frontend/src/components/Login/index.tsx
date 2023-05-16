import { useState } from "react";
import CreateForm from "./Form/CreateForm";
import LoginForm from "./Form/LoginForm";
import Form from "./Form";
import Error from "./Error";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Login = () => {
  const [showCreate, setShowCreate] = useState(false);
  const error = useSelector((state: RootState) => state.error.value);
  return (
    <div className="relative flex h-screen flex-col items-center">
      <div className="m-4 mb-24 w-fit">
        {error ? <Error /> : <h1 className="p-4 text-4xl">BookL:</h1>}
      </div>

      <Form>
        {!showCreate ? (
          <LoginForm setCreate={setShowCreate} />
        ) : (
          <CreateForm setCreate={setShowCreate} />
        )}
      </Form>
    </div>
  );
};

export default Login;
