import { ReactElement } from "react";
const Form = ({ children }: { children: ReactElement }) => {
  return (
    <div className="fixed top-40 flex flex-col items-center rounded-lg border-2 border-slate-600/80 bg-gray-50 p-8  shadow-lg">
      {children}
    </div>
  );
};

export default Form;
