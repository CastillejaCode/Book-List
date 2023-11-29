import { AuthError, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import useToast from "src/hooks/useToast";

export default function AnonLogin() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAnonLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/home");
    } catch (error) {
      const { message } = error as AuthError;
      addToast({ message, type: "error" });
    }
  };

  return (
    <button onClick={handleAnonLogin} className="btn-outline btn">
      Try it out
    </button>
  );
}
