import { useState } from "react";
import CreateForm from "./CreateForm";
import LoginForm from "./LoginForm";

const Index = () => {
  const [showCreate, setShowCreate] = useState(false);
  return (
    <div className="flex h-screen flex-col items-center justify-between p-2">
      <h1 className="m-2 text-4xl ">BookL:</h1>
      {!showCreate ? (
        <LoginForm setCreate={setShowCreate} />
      ) : (
        <CreateForm setCreate={setShowCreate} />
      )}
    </div>
  );
};

export default Index;
