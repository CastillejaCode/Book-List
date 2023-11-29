import { useDispatch } from "react-redux";
import { AuthError, signInAnonymously } from "firebase/auth";
import auth from "src/auth/config";
import { addToast } from "src/slices/toastSlice";
import { useNavigate } from "react-router-dom";

export default function AnonLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAnonLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/home");
    } catch (error) {
      const { message } = error as AuthError;
      dispatch(addToast({ message, type: "error" }));
    }
  };

  return (
    <button onClick={handleAnonLogin} className="btn-outline btn">
      Try it out
    </button>
  );
}
