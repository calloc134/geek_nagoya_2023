import { EffectImageBlock } from "src/components/EffectmageBlock";
import { OriginalImageBlock } from "src/components/OriginalImageBlock";
import { Button } from "src/components/Button";
import { css } from "src/lib/styled-system/css";
import { AfterImageBlock } from "src/components/AftermageBlock";

import { useMutation } from "urql";
import { graphql } from "src/lib/generated/gql";
import { useImageFiles } from "src/utilities/useImageFiles";
import { Grid } from "react-loader-spinner";
import { useReward } from "react-rewards";

const UploadImageMutation = graphql(`
  mutation UploadImageMutation($somefile: File, $somefile2: File) {
    process_image(camera_image: $somefile, original_image: $somefile2) {
      url
    }
  }
`);

const Index = () => {
  // urqlのミューテーションのフックを呼び出し
  const [result, executeMutation] = useMutation(UploadImageMutation);

  // コンテキストを使用するため呼び出し
  const { file1, file2 } = useImageFiles();

  // 紙吹雪を表示するためのフックを呼び出し
  const { reward } = useReward("rewardId", "confetti");

  // ボタンを押下した時の処理
  const onClickButton = async () => {
    console.debug("onClickButton");
    if (file1 == null || file2 == null) {
      console.debug("ファイルが選択されていません");
      return;
    }
    // ミューテーションを実行
    await executeMutation({
      somefile: file1,
      somefile2: file2,
    });

    reward();
  };

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
          <EffectImageBlock />
          <OriginalImageBlock />
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
            <h1 className={css({ fontSize: "2xl" })}>もさふぇいす</h1>
            <p className={css({ fontSize: "xl" })}>使い方</p>
            <p className={css({ fontSize: "lg" })}>
              画像をアップロードした後に カメラから表情を撮影してね
            </p>
          </div>
        </div>
        <div
          className={css({
            gap: "4",
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "gray.1",
            border: "2px solid",
            borderRadius: "lg",
            padding: "2",
            width: "10/12",
          })}
        >
          <span
            id="rewardId"
            className={css({
              width: "full",
              height: "0",
            })}
          />
          <Button onClick={onClickButton}>アップロード</Button>
          {
            // ミューテーションの結果を表示
            result.data?.process_image?.url ? (
              <AfterImageBlock image_url={result.data?.process_image?.url} />
            ) : null
          }
          {result.fetching ? (
            <div className={css({ margin: "auto" })}>
              <Grid color="gray.1" height={100} width={100} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { Index };
