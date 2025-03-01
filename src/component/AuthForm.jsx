import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthForm = ({ type }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to call login API
  const loginUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        // Handle successful login, e.g., save JWT token and navigate
        console.log("Login successful", data);
        // You can save the token in localStorage or state
        localStorage.setItem("authToken", data.token);
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        // Handle error
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // Function to call register API
  const registerUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: String(password) }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful registration, e.g., save JWT token and navigate
        console.log("Registration successful", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        // Handle error
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "login") {
      loginUser(formData.email, formData.password);
    } else {
      registerUser(formData.email, formData.password);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          {type === "login" ? "Login" : "Register"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Displaying error message if it exists */}
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Loading..." : type === "login" ? "Login" : "Register"}
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
            {type === "login" ? (
              <>
                Dont have an account?{" "}
                <Link
                  onClick={() => navigate("/register")}
                  style={{ cursor: "pointer" }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                >
                  Login
                </Link>
              </>
            )}
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default AuthForm;
