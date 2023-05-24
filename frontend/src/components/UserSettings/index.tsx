import auth from "../../auth/config";
import * as Tabs from "@radix-ui/react-tabs";
import Account from "./Account";
import Password from "./Password";
import { useState } from "react";
import Delete from "./Delete";
import { Toast } from "@radix-ui/react-toast";

const UserSettings = () => {
  const [name, setName] = useState(auth.currentUser?.displayName);

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="mb-10 text-center text-3xl">{name}</h1>
      <Tabs.Root
        defaultValue="tab1"
        className=" rounded-lg border-2 border-gray-900 bg-gray-50"
      >
        <Tabs.List
          aria-label="tabs"
          className=" flex justify-between gap-4 border-b-2 border-gray-500 px-6 py-2 text-xl"
        >
          <Tabs.Trigger
            value="tab1"
            className="text-gray-700 underline-offset-4 focus:text-gray-900 data-[state=active]:underline"
          >
            Account
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="text-gray-700 underline-offset-4 focus:text-gray-900 data-[state=active]:underline"
          >
            Password
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            className="text-gray-700 underline-offset-4 focus:text-gray-900 data-[state=active]:underline"
          >
            Delete
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="px-4 pb-6 pt-4">
          <Account handleName={setName} />
        </Tabs.Content>
        <Tabs.Content value="tab2" className="px-4 pb-6 pt-4">
          <Password />
        </Tabs.Content>
        <Tabs.Content value="tab3" className=" px-4 pb-6 pt-4">
          <Delete />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default UserSettings;
