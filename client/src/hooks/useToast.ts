import { useDispatch } from "react-redux";
import { Toast, addToast } from "src/slices/toastSlice";

export default function useToast() {
  const dispatch = useDispatch();
  return {
    addToast(toast: Toast) {
      dispatch(addToast(toast));
    },
  };
}
