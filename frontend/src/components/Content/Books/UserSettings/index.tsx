import auth from "../../../../auth/config";
import * as Tabs from "@radix-ui/react-tabs";
import Account from "./Account";
import Password from "./Password";
import { useState } from "react";

const UserSettings = () => {
  const [name, setName] = useState(auth.currentUser?.displayName);

  return (
    <div className="mt-10 flex flex-col">
      <h1 className="mb-10 text-center text-3xl">{name}</h1>

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
          <Account handleName={setName}/>
        </Tabs.Content>
        <Tabs.Content value="tab2" className="px-4 pb-6 pt-4">
          <Password />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default UserSettings;
