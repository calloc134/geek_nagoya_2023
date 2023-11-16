import { AfterImageBlock } from "src/components/AftermageBlock";
import { BeforeImageBlock } from "src/components/BeforeImageBlock";
import { css } from "src/lib/styled-system/css";

const Index = () => {
  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        backgroundColor: "gray.1",
        border: "2px solid",
        borderRadius: "lg",
        padding: "2",
        shadow: "lg",
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "2",
          width: "full",
        })}
      >
        <div
          className={css({
            gap: "4",
            display: "flex",
            // width: "full",
            flexDirection: "column",
            sm: {
              flexDirection: "row",
            },
          })}
        >
          <BeforeImageBlock />
          <AfterImageBlock />
        </div>
        <div
          className={css({
            gap: "4",
            display: "flex",
            margin: "auto",
            backgroundColor: "gray.1",
            border: "2px solid",
            borderRadius: "lg",
            padding: "2",
            width: "10/12",
          })}
        >
          <div
            className={css({
              display: "flex",
              gap: 4,
              justifyContent: "center",
              flexDirection: "column",
              padding: "2",
            })}
          >
            <h1 className={css({ fontSize: "2xl" })}>もさふぇいす!</h1>
            <p className={css({ fontSize: "xl" })}>使い方</p>
            <p className={css({ fontSize: "lg" })}>
              画像をアップロードした後に カメラから表情を撮影してね
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Index };
