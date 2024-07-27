export const PATHS_LIST: Paths.Item[] = [
  {
    path: "/auth",
    name: "AUTH",
    title: "Auth",
  },
  {
    path: "/login",
    name: "LOGIN",
    title: "Login",
  },
  {
    path: "/signup",
    name: "SIGN_UP",
    title: "Sign Up",
  },
  {
    path: "/home",
    name: "HOME",
    title: "Home",
  },
  {
    path: "/",
    name: "ROOT",
    title: "",
  },
  {
    path: "/accounts",
    name: "ACCOUNTS",
    title: "",
  },
  {
    path: "/categories",
    name: "CATEGORIES",
    title: "",
  },
  {
    path: "/transactions",
    name: "TRANSACTIONS",
    title: "",
  },
  {
    path: "/settings",
    name: "SETTINGS",
    title: "",
  },
  {
    path: "/profile",
    name: "PROFILE",
    title: "",
  },
  {
    path: "*",
    name: "ANY",
    title: "",
  },
];

export const PATHS: Paths.Map = PATHS_LIST.reduce(
  (res, { path, name }) => ({ ...res, [name]: path }),
  {} as Paths.Map
);
