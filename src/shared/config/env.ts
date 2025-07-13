interface EnvConfig {
  API_URL: string;
}

export const env: EnvConfig = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
}; 