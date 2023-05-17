import auth from "../../../../auth/config";
import * as Tabs from "@radix-ui/react-tabs";
import AccountForm from "./Account";

const UserSettings = () => {
  return (
    <div className="mt-10 flex flex-col">
      <h1 className="mb-10 text-center text-3xl">
        {auth.currentUser?.displayName}
      </h1>

      <Tabs.Root
        defaultValue="tab1"
        className="max-w-xl rounded-lg border border-gray-900 bg-gray-50"
      >
        <Tabs.List
          aria-label="tabs"
          className=" flex justify-between gap-4 border-b-2 border-gray-300 px-6 py-2 text-xl"
        >
          <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Delete</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="px-4 pb-6 pt-4">
          <AccountForm />
        </Tabs.Content>
        <Tabs.Content value="tab2">Stuff</Tabs.Content>
      </Tabs.Root>

      {/* <div className="rounded-md border-2 border-gray-900 bg-gray-50 p-10">
        <ul className="menu  mb-10 text-xl">
          <span className="text-2xl underline underline-offset-4">Edit</span>
          <li>
            <a> name</a>
          </li>
          <li>
            <a>email</a>
          </li>
          <li>
            <a>password</a>
          </li>
        </ul>
        <ul className="menu text-xl">
          <span className=" text-2xl underline underline-offset-4">Delete</span>
          <li>
            <a>books</a>
          </li>
          <li>
            <a>account</a>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default UserSettings;
