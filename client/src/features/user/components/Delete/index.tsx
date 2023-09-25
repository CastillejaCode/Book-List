import ConfirmDialog from "./ConfirmDialog";

const Delete = () => {
  return (
    <div className="flex flex-col items-center gap-10 py-4">
      <ConfirmDialog data />
      <ConfirmDialog account />
    </div>
  );
};

export default Delete;
