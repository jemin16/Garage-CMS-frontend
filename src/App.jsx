import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./component/PrivateRoute";
import Customer from "./pages/Customer";
import Service from "./pages/Service";
import Invoice from "./pages/Invoice";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";

const lightTheme = createTheme({
  palette: {
    mode: "light", // Ensure it's explicitly set to light mode
    primary: {
      main: "#1976d2", // Adjust primary color if needed
    },
    background: {
      default: "#ffffff", // Set background to white
      paper: "#f5f5f5", // Light gray background for elements
    },
    text: {
      primary: "#000000", // Set text color to black
      secondary: "#555555",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline /> {/* Ensures the global background is applied */}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
              <Route index path="/dashboard" element={<Dashboard />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="/service" element={<Service />} />
              <Route path="/invoice" element={<Invoice />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
