import { useRef } from "react";
import { useDeleteAllBooksMutation } from "src/services/books";
import { useDispatch } from "react-redux";
import { toggleUser } from "src/slices/toggleSlice";
import { deleteUser } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "src/auth/config";

interface Props {
  data?: boolean;
  account?: boolean;
}

const ConfirmDialog = ({ data, account }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDialogElement>(null);
  const [user] = useAuthState(auth);
  const [deleteAllBooks] = useDeleteAllBooksMutation();

  const deleteData = async () => {
    if (!user) return;
    const uid = user.uid;
    await deleteAllBooks({ uid });
    dispatch(toggleUser());
  };

  const deleteAccount = async () => {
    try {
      if (!user) return;
      await deleteData();
      await deleteUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className=" btn border-0 bg-red-300 text-lg normal-case text-red-900"
        onClick={() => ref.current?.showModal()}
      >
        Delete {data ? "Data" : "Account"}
      </button>
      <dialog ref={ref} className=" rounded-lg px-8 py-6">
        <div className="flex flex-col gap-10 rounded-lg">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl">Are you sure?</h1>
            <h2 className="text-lg font-light">
              This action cannot be undone.
            </h2>
          </div>
          <form method="dialog" className="flex items-end justify-evenly gap-6">
            <button className="btn-outline btn border-0 bg-gray-300 text-lg normal-case text-gray-600">
              Cancel
            </button>
            {data && (
              <button
                className="btn  border-0 bg-red-300 text-lg normal-case text-red-900"
                onClick={deleteData}
              >
                Yes, Delete Data
              </button>
            )}
            {account && (
              <button
                className="btn  border-0 bg-red-300 text-lg normal-case text-red-900"
                onClick={deleteAccount}
              >
                Yes, Delete Account
              </button>
            )}
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmDialog;
