import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { AxiosError } from "axios";
import { AxiosErrResponse } from "../api/types";

const Login = () => {
  //ページ遷移用の関数
  const navigate = useNavigate();

  //状態を管理するためのstate
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    // 入力の文字列を取得
    const data = new FormData(e.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    // 検証
    let isError = false;
    setUsernameErrText("");
    setPasswordErrText("");
    if (!username) {
      setUsernameErrText("名前を入力してください");
      isError = true;
    }
    if (!password) {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    }

    if (isError) {
      setLoading(false);
      return;
    }
    //新規登録APIを呼び出す
    try {
      const res = await authApi.login({
        username: username,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      console.log("API通信成功", res.data.token);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("API通信失敗", error.response?.data);
        const errorResponse = error.response?.data as AxiosErrResponse;
        errorResponse.errors.forEach((e) => {
          if (e.path === "username") {
            setUsernameErrText(e.msg);
          } else if (e.path === "password") {
            setPasswordErrText(e.msg);
          }
        });
      } else {
        console.log("不明型", error);
      }
    } finally {
      setLoading(false);
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
          error={!!usernameErrText}
          disabled={loading}
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
          error={!!passwordErrText}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/Register">
        アカウントを持っていない場合、新規登録してください
      </Button>
    </>
  );
};

export default Login;

/**BOx TextField */
