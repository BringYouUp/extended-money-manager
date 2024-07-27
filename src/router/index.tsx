import { PATHS } from "@consts/paths";
import { Root } from "@entities/Root";
import { UnAuthRoot } from "@entities/UnAuthRoot";

import { AccountsPage } from "@pages/Accounts";
import { CategoriesPage } from "@pages/Categories";
import { LoginPage } from "@pages/Login";
import { MainPage } from "@pages/Main";
import { ProfilePage } from "@pages/Profile";
import { SignUpPage } from "@pages/SignUp";
import { TransactionsPage } from "@pages/Transactions";

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
        path: PATHS.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: PATHS.ANY,
        element: <Navigate to={PATHS.ROOT} />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
