import { Outlet } from "@tanstack/react-router";
import { css } from "./lib/styled-system/css";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Camera } from "tabler-icons-react";
import { Link } from "@tanstack/react-router";

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
          <Camera
            size={32}
            className={css({
              color: "gray.1",
            })}
          />
          <Link
            to="/"
            className={css({
              fontSize: 24,
              color: "gray.1",
            })}
          >
            もさふぇいす
          </Link>
        </div>
        <div
          className={css({
            width: "11/12",
            gap: 4,
            margin: "auto",
            padding: 4,
          })}
        >
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </div>
  );
};

export { Document };
