import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

const drawerWidth = 240;
const headerHeight = 64; // Consistent height

const Header = ({ onLogout, onMenuClick }) => {
  const isMobile = useMediaQuery("(max-width: 900px)"); // Detect mobile

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : "100%",
        ml: isMobile ? 0 : `${drawerWidth}px`,
        bgcolor: "#F0F0D7",
        height: `${headerHeight}px`,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // Centers horizontally
          alignItems: "center", // Centers vertically
          gap: 2, // Adds space between items
        }}
      >
        {isMobile && (
          <IconButton edge="start" color="black" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            height: `${headerHeight}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a href="/dashboard">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 512 512"
            >
              <path
                fill="#000"
                d="M426.24 30c-13.635.02-38.617 9.837-47.707 20H68.24c-32 0-32 64 0 64h310.301c9.088 10.16 34.067 19.978 47.7 20c17.123-.025 32.937-13.17 41.5-28h-39.5l-22-24l22-24h39.519c-8.565-14.835-24.39-27.982-41.52-28m-342 36c8.837 0 16 7.163 16 16s-7.163 16-16 16s-16-7.163-16-16s7.164-16 16-16m75.77 117c-8 0-13.83 4.038-20.166 8.813c-6.336 4.774-12.98 10.944-20.041 17.67c-13.752 13.096-29.103 28.29-43.608 38.218l45.407 1.135c11.17-20.948 18.277-40.386 38.408-47.836h71v50.572l18 .45V201h23c11.5 0 30.948 10.484 50.377 26.027c10.483 8.387 21.064 18.01 31.117 27.608l49.611 1.24l49.729-58.018l-13.668-11.714l-59.237 69.109c-13.952-13.825-29.952-29.196-46.306-42.28C313.06 196.517 292.51 183 272.01 183zM47.986 265.004c-4.995.008-11.034 2.78-15.613 7.36C27.787 276.948 25.01 283 25.01 288c0 13 7.276 32.26 16.633 47.23c4.355 6.97 9.123 13.056 13.38 17.313c-.001-.182-.013-.36-.013-.543c0-31.374 25.626-57 57-57s57 25.626 57 57c0 2.37-.163 4.704-.447 7h190.894a57 57 0 0 1-.447-7c0-31.374 25.626-57 57-57s57 25.626 57 57c0 2.37-.163 4.704-.447 7h9.392l5.035-45.326c-.106-12.823-6.276-21.985-14.603-28.647c-8.4-6.72-19.377-10.027-24.377-10.027h-.114zM112.01 313c-21.646 0-39 17.354-39 39s17.354 39 39 39c21.645 0 39-17.354 39-39s-17.355-39-39-39m304 0c-21.646 0-39 17.354-39 39s17.354 39 39 39c21.645 0 39-17.354 39-39s-17.355-39-39-39m-215 64v14h110v-14zm48 32v46h14v-46zm-35.438 64l-7 14h98.875l-7-14z"
              />
            </svg>
          </a>
        </Box>

        {/* Title */}
        {/* <Typography variant="h6" sx={{ color: "black", textAlign: "center" }}>
          <a href="/dashboard" style={{ color: "black" }}>
            Dashboard
          </a>
        </Typography> */}

        {/* Logout Button */}
        <Button variant="contained" color="error" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
