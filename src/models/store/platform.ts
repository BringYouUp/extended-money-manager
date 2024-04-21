import { Currencies, StoreError } from "@models"

export type StorePlatformPlatform = {
  settings: {
    [key: string]: string,
  },
  currency: Currencies
}

export type StorePlatform = {
  platform: StorePlatformPlatform,
  error: StoreError,
  status: null | string
}