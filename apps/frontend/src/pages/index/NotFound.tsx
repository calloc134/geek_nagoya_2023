import { css } from "src/lib/styled-system/css";
const NotFound = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "gray.1",
        border: "2px solid",
        borderRadius: "lg",
        padding: "2",
        gap: 4,
        shadow: "lg",
      })}
    >
      <h1 className={css({ fontSize: "2xl" })}>404 Not Found</h1>
      <p className={css({ fontSize: "xl" })}>ページが見つかりませんでした</p>
    </div>
  );
};

export { NotFound };
