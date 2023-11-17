import React, { useState, ReactNode } from "react";
import { ImageContext } from "./ImageContext";

// コンテキストプロバイダーの定義
type FileProviderProps = {
  children: ReactNode;
};

const ImageProvider: React.FC<FileProviderProps> = ({ children }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  return (
    <ImageContext.Provider value={{ file1, file2, setFile1, setFile2 }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider };
