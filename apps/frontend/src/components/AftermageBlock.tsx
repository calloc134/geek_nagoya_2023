import { css } from "src/lib/styled-system/css";

const AfterImageBlock = ({ image_url }: { image_url?: string }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        backgroundColor: "gray.2",
        border: "2px solid",
        borderRadius: "xl",
        padding: "4",
        margin: "auto",
      })}
    >
      <h2 className={css({ fontSize: "2xl" })}>出力画像</h2>
      <img
        src={image_url ? image_url : "https://picsum.photos/400"}
        className={css({
          borderRadius: "xl",
          width: "full",
          maxWidth: "400px",
        })}
      />
    </div>
  );
};

export { AfterImageBlock };
