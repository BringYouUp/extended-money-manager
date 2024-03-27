export type StoreCategoryIcon = "docs" | 'android' | 'desktop' | 'attributes' | "browse" | "bucket" | "calendarStart" | "clock" | "command" | "conversations" | "creditCard" | "pin" | "feed" | "form" | "gift" | "heart" | "newFolder" | "private" | "sparkle" | "star" | "subscribe" | "sync" | "tag" | "user" | "windows" | "copy" | "settings" | "palmtree"

export type StoreCategoriesCategory = {
  name: string;
  color: string;
  icon: StoreCategoryIcon;
  currency: '$';
  id: string,
  createdAt: string
}

export type StoreCategoriesCategories = StoreCategoriesCategory[]

export type StoreCategoriesError = {
  message: string,
  code: string
}

export type StoreCategories = {
  categories: StoreCategoriesCategories,
  error: StoreCategoriesError
  ,
}