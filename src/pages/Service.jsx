import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  TableContainer,
  Paper,
} from "@mui/material";
import axios from "axios";

const Service = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price_per_unit: "",
  });

  useEffect(() => {
    fetchServices();
    // fetchCustomers();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get("http://localhost:5000/services");
    setServices(response.data);
  };

  // const fetchCustomers = async () => {
  //   const response = await axios.get("http://localhost:5000/customers");
  //   setCustomers(response.data);
  // };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post("http://localhost:5000/services", form);
    setForm({ name: "", price_per_unit: ""});
    fetchServices();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/services/${id}`);
    fetchServices();
  };

  return (
    <div style={{ }}>
      <h1>Services Data</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Service Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <TextField
          label="Price Per Unit"
          name="price_per_unit"
          value={form.price_per_unit}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Add Service
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Service Name</TableCell>
              <TableCell>Price Per Unit</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.price_per_unit}</TableCell>
                <TableCell>
                  {new Date(service.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(service.updated_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(service.id)}
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

export default Service;
