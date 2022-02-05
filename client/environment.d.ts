declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      CLIENT_HOST: string;
      CLIENT_PORT: any;
    }
  }
}

export {}