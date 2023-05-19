import ConfirmDialog from "./ConfirmDialog";

const Delete = () => {
  return (
    <div className="flex w-fit flex-grow  flex-col items-center gap-10">
      <ConfirmDialog data />
      <ConfirmDialog />
    </div>
  );
};

export default Delete;
