import { createContext } from "react";

// ファイルを格納するための構造体型を定義
type FileContextType = {
  file1: File | null;
  file2: File | null;
  setFile1: (file: File | null) => void;
  setFile2: (file: File | null) => void;
};

// デフォルト値を設定
const defaultValues: FileContextType = {
  file1: null,
  file2: null,
  setFile1: () => {},
  setFile2: () => {},
};

// コンテキストの作成
const ImageContext = createContext<FileContextType>(defaultValues);

export { ImageContext };
