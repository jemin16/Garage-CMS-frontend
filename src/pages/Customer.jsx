import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile_number: "",
    profile_picture: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(); // Formats to readable date-time
  };

  const fetchCustomers = async () => {
    const response = await axios.get("http://localhost:5000/customers");
    setCustomers(response.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/customers", form);
    setForm({ name: "", mobile_number: "", profile_picture: "" });
    fetchCustomers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div>
      <h1>Customers</h1>
      <div style={{ display: "flex", alignItems: "stretch",marginBottom: "20px" }}>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Mobile Number"
          name="mobile_number"
          value={form.mobile_number}
          onChange={handleChange}
        />
        <TextField
          label="Profile Picture URL"
          name="profile_picture"
          value={form.profile_picture}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Add Customer
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Profile Picture</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.mobile_number}</TableCell>
                <TableCell>
                  <img
                    src={customer.profile_picture}
                    alt="Profile"
                    width="50"
                  />
                </TableCell>
                <TableCell>{formatDate(customer.created_at)}</TableCell>
                <TableCell>{formatDate(customer.updated_at)}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Customer;
