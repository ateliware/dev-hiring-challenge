declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_HOST: string;
      SERVER_PORT: string;
      NODE_ENV: 'development' | 'test';
    }
  }
}

export {}