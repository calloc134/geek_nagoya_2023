import { ImageProvider } from "./utilities/ImageProvider";
import { Outlet } from "@tanstack/react-router";
import { css } from "./lib/styled-system/css";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Link } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import HelpButton from "./components/ExplainButton";

const Document = () => {
  return (
    <div
      className={css({
        justifyContent: "center",
        display: "flex",
        height: "full",
        width: "full",
        minHeight: "full",
        bg: "gray.2",
      })}
    >
      <Helmet>
        <title>Photosista</title>
        <meta property="og:title" content="Photosista" />
        <meta
          property="og:description"
          content="型破りで変幻自在な画像加工アプリ"
        />
        <meta property="og:image" content="src/photosista_ogp.png" />
      </Helmet>

      <div
        className={css({
          // display: "flex",
          width: "full",
          height: "max-content",
        })}
      >
        <div
          className={css({
            padding: 4,
            bg: "gray.12",
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderBottomRadius: "2xl",
            shadow: "lg",
          })}
        >
          <Link
            to="/"
            className={css({
              fontSize: 24,
              color: "gray.1",
            })}
          >
            <img
              src="/photosista_2.png"
              alt="photosista"
              className={css({
                height: "3em",
                width: "auto",
              })}
            />
          </Link>
          <div className={css({ marginLeft: "auto", paddingRight: "10px" })}>
            <HelpButton />
          </div>
        </div>
        <div
          className={css({
            width: "11/12",
            gap: 4,
            margin: "auto",
            padding: 4,
          })}
        >
          <ImageProvider>
            <Outlet />
          </ImageProvider>
        </div>
      </div>
      <TanStackRouterDevtools />
      <Toaster />
    </div>
  );
};

export { Document };
