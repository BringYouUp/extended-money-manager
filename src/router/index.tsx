import { PATHS } from "@consts";
import { Root, UnAuthRoot } from "@containers";
import {
  AccountsPage,
  CategoriesPage,
  LoginPage,
  MainPage,
  SignUpPage,
  TransactionsPage,
} from "@pages";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const routes = [
  {
    path: PATHS.AUTH,
    element: <UnAuthRoot />,
    children: [
      {
        path: `${PATHS.AUTH}${PATHS.LOGIN}`,
        element: <LoginPage />,
      },
      {
        path: `${PATHS.AUTH}${PATHS.SIGN_UP}`,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: PATHS.ROOT,
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: PATHS.ACCOUNTS,
        element: <AccountsPage />,
      },
      {
        path: PATHS.CATEGORIES,
        element: <CategoriesPage />,
      },
      {
        path: PATHS.TRANSACTIONS,
        element: <TransactionsPage />,
      },
      {
        path: PATHS.ANY,
        element: <Navigate to={PATHS.ROOT} />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
