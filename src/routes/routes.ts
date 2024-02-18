import { createBrowserRouter, redirect } from "react-router-dom";

import { LoginPage } from "../pages/Login";
import { PublicPage } from "../pages/Public";
import { Layout } from "../components/Layout";
import { fakeAuthProvider } from "../mocks/auth";
import { ProtectedPage } from "../pages/Protected";
import { loginAction } from "./actions/login.action";
import { loginLoader } from "./loaders/login.loader";
import { protectedLoader } from "./loaders/protected.loader";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);
