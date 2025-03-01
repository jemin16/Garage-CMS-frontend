import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

// const drawerWidth = 240;
const headerHeight = 64;

const Layout = () => {
  const navigate = useNavigate();
  // const isMobile = useMediaQuery("(max-width: 900px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box sx={{ position: "fixed", width: "100%", zIndex: 1100 }}>
          <Header onLogout={handleLogout} onMenuClick={toggleSidebar} />
        </Box>

        {/* Sidebar and Content */}
        <Box sx={{ display: "flex", flexGrow: 1, mt: `${headerHeight}px` }}>
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
        </Box>

        <Box sx={{ flexGrow: 1, padding: "40px", bgcolor: "#D0DDD0" }}>
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
