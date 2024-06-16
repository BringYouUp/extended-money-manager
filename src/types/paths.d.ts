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
    ANY,
  }

  type Item = {
    path: string,
    name: keyof typeof Enum,
    title: string,
  }

  type Map = {
    [K in keyof typeof Enum]: string
  }
}