/* 環境変数の型定義が効かないので拡張する */
//https://typescriptbook.jp/reference/declaration-file
declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGODB_URL: string;
        TOKEN_SECRET_KEY: string;
      }
    }
  }
}
