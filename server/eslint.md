# esLint メモ

```javascript --.eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
```

### env

チェック対象のコードがどの実行環境で使われるのか Lint に伝えるための設定

例：\

- `browser:ture` : window や alert などのグローバル変数が認識される
- `ES2021` :ES2021 までに導入されたグローバル変数が認識される

[公式ドキュメント](https://eslint.org/docs/latest/use/configure/language-options#specifying-environments)
