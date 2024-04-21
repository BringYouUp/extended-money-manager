export type StoreToast = {
  toasts: StoreToastToast[]
}

export type StoreToastToastType = "success" | "error" | "warning"

export type StoreToastToast = {
  type: StoreToastToastType,
  title: string,
  description?: string,
  id: string
}