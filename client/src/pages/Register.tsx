import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Box>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
        />
        <TextField
          fullWidth
          id="confirm-password"
          label="確認用パスワード"
          margin="normal"
          name="confirm-password"
          type="password"
          required
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
