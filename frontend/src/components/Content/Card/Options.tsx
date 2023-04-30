const Options = ({ showOptions }: { showOptions: boolean }) => {
  return (
    <div
      className={`absolute bottom-0 -z-50 flex w-full rounded-lg border-2 border-gray-500/70 bg-gray-50 p-2 shadow-md transition-all duration-300 ${
        showOptions ? "translate-y-12" : ""
      }`}
    >
      <button className="px-2 py-4">Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default Options;
