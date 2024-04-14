export type StorePlatformPlatform = {
  settings: {
    [key: string]: string
  }
}

export type StorePlatformError = {
  message: string,
  code: string
}

export type StorePlatform = {
  platform: StorePlatformPlatform,
  error: StorePlatformError,
  status: null | string
}