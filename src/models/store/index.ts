export * from './user'
export * from './account'
export * from './category'
export * from './transaction'
export * from './platform'
export * from './toast'

export type OmittedStoreFields = "id" | "createdAt" | "updatedAt"

export type StoreError = {
  message: string,
  code: string
}