import { RootRoute, Route, Router } from "@tanstack/react-router";
import { Document } from "./_document";
import { Index } from "./pages/index/Index";
import { NotFound } from "./pages/index/NotFound";
import LibraryPage from "./pages/index/libraryPage";

const root_route = new RootRoute({
  component: () => <Document />,
});

const index_route = new Route({
  getParentRoute: () => root_route,
  path: "/",
  component: () => <Index />,
});

const not_found_route = new Route({
  getParentRoute: () => root_route,
  path: "*",
  component: () => <NotFound />,
});

// 画像の閲覧ページ
const image_route = new Route({
  getParentRoute: () => root_route,
  path: "/library",
  component: () => <LibraryPage />,
});

const router = new Router({
  routeTree: root_route.addChildren([index_route, not_found_route,image_route]),
});



// tanstack routerを型安全に利用するための型定義
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { router,image_route };
