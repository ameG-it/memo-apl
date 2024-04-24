import {
  Drawer,
  List,
  ListItemButton,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect } from "react";
import { assets } from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const user = useSelector((state: RootState) => state.user);

  return (
    <Drawer
      container={window.document.body}
      sx={{
        width: 250,
        height: "100vh",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      open={true}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon></LogoutOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              お気に入り
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight={700}>
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutlinedIcon fontSize="small"></AddBoxOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
        <ListItemButton sx={{ pl: "20px" }} component={Link} to="/memo/aa">
          <Typography>かりおき</Typography>
        </ListItemButton>
      </List>
      サイドバー
    </Drawer>
  );
};

export default Sidebar;
