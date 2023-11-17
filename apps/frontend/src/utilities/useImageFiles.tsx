import { useContext } from "react";
import { ImageContext } from "./ImageContext";

// コンテキストを使用するためのカスタムフック
const useImageFiles = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImageFiles must be used within a ImageProvider");
  }
  return context;
};

export { useImageFiles };
