export enum Paths {
  LOGIN,
  SIGN_UP,
  HOME,
  ROOT,
  ACCOUNTS,
  CATEGORIES,
  TRANSACTIONS,
}

export type PathListItem = {
  path: string,
  name: keyof typeof Paths,
  title: string,
}

export type TPaths = {
  [K in keyof typeof Paths]: string
}