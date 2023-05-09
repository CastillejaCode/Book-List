import { useState } from "react";
import CreateForm from "./CreateForm";
import LoginForm from "./LoginForm";
import Form from "./Form";

const Index = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="relative flex h-screen flex-col items-center">
      <h1 className="m-4 mb-24 w-fit text-4xl ">BookL:</h1>
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

export default Index;
