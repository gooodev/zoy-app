declare namespace NodeJS {
  interface ProcessEnv {
    // App
    NEXT_PUBLIC_MAX_VOTE_COUNT: number
    NEXT_PUBLIC_YEAR: number
    // Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY: string
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
    NEXT_PUBLIC_FIREBASE_APP_ID: string
    [key: string]: never
  }
}
