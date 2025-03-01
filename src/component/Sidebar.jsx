import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;
// const headerHeight = 64; // Match header height

// eslint-disable-next-line react/prop-types
const Sidebar = ({ open, onClose }) => {
  const isMobile = useMediaQuery("(max-width: 900px)"); // Detect mobile

  useEffect(() => {
    console.log("_dd isMobile", isMobile);
  }, [isMobile]);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: isMobile ? drawerWidth : "auto",
        flexShrink: 0,
        height: "100%",
        "& .MuiDrawer-paper": {
          width: isMobile ? drawerWidth : "auto",
          boxSizing: "border-box",
          height: "100%",
        },
        bgcolor: "#D0DDD0",
      }}
    >
      <Box sx={{ height: "100%", width: drawerWidth, bgcolor: "#AAB99A", marginTop: isMobile ? "0px" : "64px" , position: "inherit" }}>
        {/* Sidebar Links */}
        <List>
          {["Customer", "Service", "Invoice"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/${text.toLowerCase()}`}
              onClick={onClose}
              sx={{ bgcolor: "#AAB99A", color: "white" }}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
