/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_KEY: string;
        BASE_URL: string;
        // Add other environment variables here
      }
    }
  }
  
  export {};