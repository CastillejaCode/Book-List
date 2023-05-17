import { useField } from "../../../Login/Form/useField";

const AccountForm = () => {
  const name = useField("name", "text");
  const email = useField("email", "text");
  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <div className="font-light">
        <h2>Make changes to your account here.</h2>
      </div>
      <form className="flex w-full flex-col gap-6 p-0">
        <div className="flex flex-col">
          <label htmlFor="name">first name</label>
          <input
            {...name}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <button className="btn self-end border-0  bg-green-200 text-green-900">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AccountForm;
