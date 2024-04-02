module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // 構文を解析するパーサを設定。typescript用にする
  parser: "@typescript-eslint/parser",

  // 公式以外が作成したールールをプラグインとして読み込むことができる。TypeScript独自のルールを追加
  plugins: ["@typescript-eslint"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },

  // コンパイル結果はチェック対象から除外
  ignorePatterns: ["node_modules"],
};
