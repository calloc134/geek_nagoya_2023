import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { css } from "src/lib/styled-system/css";
import { useImageFiles } from "src/utilities/useImageFiles";
import { Reload, Trash } from "tabler-icons-react";

const OriginalImageBlock = () => {
  const defaultImageUrl = "https://pub-ff76be015fe2485bb8d12628f4d70b12.r2.dev/upload.png";
  const [imageSrc, setImageSrc] = useState(defaultImageUrl);

  const { getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      multiple: false,
      onDrop: (acceptedFiles) => {
        // ImageContextを使用するため呼び出し
        setImageSrc(URL.createObjectURL(acceptedFiles[0]));
        setFile1(acceptedFiles[0]);
      },
    });

  // ImageContextを使用するため呼び出し
  const { setFile1 } = useImageFiles();
  // 画像のソースを保持するためのステート

  const handleRemoveFile = () => {
    setFile1(null);
    setImageSrc(defaultImageUrl);
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        backgroundColor: "gray.2",
        border: "2px solid",
        borderRadius: "xl",
        padding: "4",
        alignItems: "center",
        justifyContent: "center",
        width: "auto",
        sm: {
          width: "1/2",
        },
      })}
    >
      <h2 className={css({
          fontSize: "2xl",
          marginBottom: "20px",
          marginTop: "10px",
          maxWidth: "400px",
          maxHeight: "400px",
        })}>エフェクト画像</h2>
        <div {...getRootProps()} className={css({
            width: "95%",
            paddingTop: "95%",
            position: "relative",
            borderRadius: "xl",
            backgroundColor: "black",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          })}>
        <input {...getInputProps()} />
        <img
          src={imageSrc}
          className={css({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            borderRadius: "xl",
            cursor: "pointer",
          })}
        />
      </div>
      {imageSrc !== defaultImageUrl ? (
        <>
          <button
            onClick={handleRemoveFile}
            className={css({
              backgroundColor: "black",
              color: "white",
              padding: "2",
              fontSize: "lg",
              borderRadius: "md",
              cursor: "pointer",
              width: "95%",
              marginTop: "2",
              objectFit: "contain",
              objectPosition: "center",
            })}
          >
            <Trash size={25} className={css({
              width: "100%",
            })}/>
          </button>
          <button
            {...getRootProps()}
            className={css({
              backgroundColor: "#1e88e5",
              color: "white",
              padding: "2",
              fontSize: "lg",
              borderRadius: "md",
              cursor: "pointer",
              width: "95%",
              marginTop: "2",
              objectFit: "contain",
              objectPosition: "center",
            })}
          >
            <Reload size={25}className={css({
              width: "100%",
            })}/>
          </button>
        </>
      ) : (
        <div
          className={css({
            width: "auto",
            height: "88px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "lg",
            color: "gray.600",
            textAlign: "center",
            marginTop: "4",
          })}
        >
          ファイルをドラッグするか、選択してください。
        </div>
      )}
    </div>
  );
};

export { OriginalImageBlock };
