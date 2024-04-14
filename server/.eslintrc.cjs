module.exports = {
  root: true,

  // 構文を解析するパーサを設定。typescript用にする
  parser: "@typescript-eslint/parser",

  // 公式以外が作成したールールをプラグインとして読み込むことができる。TypeScript独自のルールを追加
  plugins: ["@typescript-eslint"],

  // 実行環境の設定
  env: {
    es2021: true,
  },

  //
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },

  // コンパイル結果はチェック対象から除外
  ignorePatterns: ["dist", "node_modules"],

  // ルールの設定を継承
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],

  // 個別のルールの設定を変更
  rules: {
    // 継承を停止
    "import/prefer-default-export": "off",
    // 文字を囲うクォートをダブルクオーとにする。
    "@typescript-eslint/quotes": ["error", "double"],
    //mongoDBの_idを許可
    "no-underscore-dangle": ["error", { allow: ["_id"] }],

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*.test.ts*"],
      },
    ],
  },
};
