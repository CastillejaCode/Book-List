import { AuthError, deleteUser } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import ConfirmChoice from "src/components/ui/ConfirmChoice";
import { useDeleteAllBooksMutation } from "src/services/books";
import { setToast } from "src/slices/toastSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [deleteAllBooks] = useDeleteAllBooksMutation();

  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState(false);

  const deleteData = async () => {
    try {
      if (!user) return;
      const uid = user.uid;
      await deleteAllBooks({ uid });
      dispatch(setToast({ message: "Data deleted" }));
    } catch (error) {
      const { message } = error as AuthError;
      dispatch(setToast({ type: "error", message }));
    }
  };

  const deleteAccount = async () => {
    try {
      if (!user) return;
      await deleteData();
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      const { message } = error as AuthError;
      dispatch(setToast({ type: "error", message }));
    }
  };

  const handleData = () => {
    setVisible(true);
    setAccount(false);
  };

  const handleAccount = () => {
    setVisible(true);
    setAccount(true);
  };

  return (
    <div className="flex flex-col items-center gap-10 py-4">
      <ConfirmChoice
        visible={visible}
        setVisible={setVisible}
        confirmAction={account ? deleteAccount : deleteData}
      />
      <button className="btn-error btn" onClick={handleData}>
        Delete data
      </button>
      <button className="btn-error btn" onClick={handleAccount}>
        Delete account
      </button>
    </div>
  );
};

export default Delete;
