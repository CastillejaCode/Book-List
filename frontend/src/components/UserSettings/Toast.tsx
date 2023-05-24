import { useEffect } from "react";

interface Props {
  toast: string;
  setToast: React.Dispatch<string>;
}

const Toast = ({ toast, setToast }: Props) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setToast("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div
      className={`fixed bottom-6 right-6 rounded-lg border-2 border-gray-800 px-2 py-4 shadow-xl transition-all duration-300
       ${toast ? "visible" : "invisible"} `}
    >
      <p>{toast}</p>
    </div>
  );
};

export default Toast;
