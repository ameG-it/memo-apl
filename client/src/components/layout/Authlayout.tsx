import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/system";
import logoimg from "../../assets/images/logo.png";
import authUtils from "../../utils/authUtils";

const Authlayout = () => {
  const navigate = useNavigate();

  // 遷移のたびに発火させる
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();

      if (isAuth) {
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logoimg} alt="" />
          Memo-apl
        </Box>
        <Outlet />
      </Container>
    </div>
  );
};

export default Authlayout;
