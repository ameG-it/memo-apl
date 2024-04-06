import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import authApi from "../api/authApi";

const Register = () => {
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmPasswordErrText, setconfirmPasswordErrText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 入力の文字列を取得
    const data = new FormData(e.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm-password") as string;

    // 検証
    let isError = false;
    setUsernameErrText("");
    setPasswordErrText("");
    setconfirmPasswordErrText("");
    if (!username) {
      setUsernameErrText("名前を入力してください");
      isError = true;
    }
    if (!password) {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    }
    if (!confirmPassword) {
      setconfirmPasswordErrText("確認用パスワードを入力してください");
      isError = true;
    }

    if (isError) {
      return;
    }
    //新規登録APIを呼び出す
    try {
      if (password !== confirmPassword) {
        throw new Error("パスワードが一致しません");
      } else {
        if (username && password && confirmPassword) {
          const res = await authApi.register({
            username: username,
            password: password,
            confirmPassword: confirmPassword,
          });
          localStorage.setItem("token", res.data.token);
          console.log("API通信成功", res.data.token);
        }
      }
    } catch (error) {
      console.log("API通信失敗", error);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
        />
        <TextField
          fullWidth
          id="confirm-password"
          label="確認用パスワード"
          margin="normal"
          name="confirm-password"
          type="password"
          required
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っている場合、ログインしてください。
      </Button>
    </>
  );
};

export default Register;

/**BOx TextField */
