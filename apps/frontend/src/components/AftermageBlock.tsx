import { css } from "src/lib/styled-system/css";
const AfterImageBlock = () => {
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
      <h2 className={css({ fontSize: "2xl" })}>変更後</h2>
      <img
        src="https://picsum.photos/400"
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
