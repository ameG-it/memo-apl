import {
  Drawer,
  List,
  ListItemButton,
  Typography,
  IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import React from "react";

const Sidebar = () => {
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
      <List sx={{ width: 250, height: "100vh" }}>
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
              メモ一覧
            </Typography>
            <IconButton>
              <LogoutOutlinedIcon></LogoutOutlinedIcon>
            </IconButton>
          </Box>
        </ListItemButton>
      </List>
      サイドバー
    </Drawer>
  );
};

export default Sidebar;
