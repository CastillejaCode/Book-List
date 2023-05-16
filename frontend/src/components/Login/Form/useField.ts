import { useState } from "react";

export const useField = (id: string, type = "string") => {
  const [value, setValue] = useState("");

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event?.target.value);
  };

  return {
    id,
    type,
    value,
    onChange,
  };
};
