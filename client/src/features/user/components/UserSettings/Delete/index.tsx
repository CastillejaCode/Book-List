import { AuthError, deleteUser } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import ConfirmChoice from "src/components/ui/ConfirmChoice";
import useToast from "src/hooks/useToast";
import { useDeleteAllBooksMutation } from "src/services/books";

const Delete = () => {
  const { addToast } = useToast();
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
      addToast({ message: "Data deleted" });
    } catch (error) {
      const { message } = error as AuthError;
      addToast({ type: "error", message });
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
      addToast({ type: "error", message });
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
