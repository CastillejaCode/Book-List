import { createContext } from "react";

interface Context {
  docs: [];
  isLoading: boolean;
  isError: boolean;
}

export const ImageContext = createContext<Context | null>(null);
