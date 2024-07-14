declare namespace Paths {
  enum Enum {
    LOGIN,
    SIGN_UP,
    HOME,
    ROOT,
    ACCOUNTS,
    CATEGORIES,
    TRANSACTIONS,
    SETTINGS,
    AUTH,
    ANY,
  }

  type Item = {
    path: string;
    name: keyof typeof Enum;
    title: string;
  };

  type Map = Record<keyof typeof Enum, string>;
}
