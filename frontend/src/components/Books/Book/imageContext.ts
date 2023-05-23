import { createContext, useContext } from "react";
import { Docs } from "../../../types";

export interface ImageContextType {
  docs: Docs;
  isLoading: boolean;
  isError: boolean;
}

export const ImageContext = createContext<ImageContextType | null>(null);

export const useImageContext = () => {
  const currentImageContext = useContext(ImageContext);

  if (!currentImageContext) {
    throw new Error(
      "useImageContext has to be used within ImageContext.Provider"
    );
  }

  return currentImageContext;
};
