import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Box } from "@mui/system";
import logoimg from "../../assets/images/logo.png";
import authUtils from "../../utils/authUtils";
import Sidebar from "../common/Sidebar";

const AppLayout = () => {
  const navigate = useNavigate();

  // 遷移のたびに発火させる
  useEffect(() => {
    const checkAuth = async () => {
      const user = await authUtils.isAuthenticated();

      if (!user) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-content" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default AppLayout;
