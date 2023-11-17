import { useDropzone } from "react-dropzone";
import { css } from "src/lib/styled-system/css";
import { useImageFiles } from "src/utilities/useImageFiles";

const EffectImageBlock = () => {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      multiple: false,
      onDrop: (acceptedFiles) => {
        // ImageContextを使用するため呼び出し
        setFile2(acceptedFiles[0]);
      },
    });

  // ImageContextを使用するため呼び出し
  const { setFile2 } = useImageFiles();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        backgroundColor: "gray.2",
        border: "2px solid",
        borderRadius: "xl",
        padding: "4",
        sm: {
          width: "1/2",
        },
      })}
    >
      <h2 className={css({ fontSize: "2xl" })}>オリジナル画像</h2>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <img
          src={
            acceptedFiles[0]
              ? URL.createObjectURL(acceptedFiles[0])
              : "https://picsum.photos/400"
          }
          className={css({
            borderRadius: "xl",
            width: "full",
            maxWidth: "400px",
          })}
        />
        {isDragActive ? (
          <p>ファイルを受け付け中</p>
        ) : (
          <p>ファイルをドラッグするか、選択してください。</p>
        )}
      </div>
    </div>
  );
};

export { EffectImageBlock };
