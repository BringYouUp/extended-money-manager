import { PathListItem, TPaths } from "@models";

export const PATHS_LIST: PathListItem[] = [
  {
    path: '/login',
    name: 'LOGIN',
    title: 'Login'
  },
  {
    path: '/signup',
    name: 'SIGN_UP',
    title: 'Sign Up'
  },
  {
    path: '/home',
    name: 'HOME',
    title: 'Home'
  },
  {
    path: '/',
    name: 'ROOT',
    title: ''
  },
  {
    path: '/accounts',
    name: 'ACCOUNTS',
    title: ''
  },
  {
    path: '/categories',
    name: 'CATEGORIES',
    title: ''
  },
  {
    path: '/transactions',
    name: 'TRANSACTIONS',
    title: ''
  },
];


export const PATHS: TPaths = PATHS_LIST.reduce((res, { path, name }) => ({ ...res, [name]: path }), {} as TPaths);