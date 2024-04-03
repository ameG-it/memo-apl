import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Box } from "@mui/system";
import logoimg from "../../assets/images/logo.png";

const Authlayout = () => {
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
