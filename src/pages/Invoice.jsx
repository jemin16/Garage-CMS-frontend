import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const Invoice = () => {
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/customers")
      .then((res) => setCustomers(res.data));
    axios
      .get("http://localhost:5000/services")
      .then((res) => setServices(res.data));
  }, []);

  const handleAddService = () => {
    if (!selectedService) return;

    const serviceDetails = services.find((s) => s.id === selectedService);

    if (!serviceDetails) return;

    // Check if service already added
    const existingService = selectedServices.find(
      (s) => s.service_id === selectedService
    );

    if (existingService) {
      alert("Service already added!");
      return;
    }

    setSelectedServices([
      ...selectedServices,
      {
        service_id: serviceDetails.id,
        name: serviceDetails.name,
        price_per_unit: serviceDetails.price_per_unit,
        quantity: 1,
      },
    ]);

    setSelectedService(""); // Reset dropdown
  };

  const handleQuantityChange = (serviceId, quantity) => {
    setSelectedServices((prev) =>
      prev.map((s) =>
        s.service_id === serviceId
          ? { ...s, quantity: Math.max(1, quantity) }
          : s
      )
    );
  };

  const handleRemoveService = (serviceId) => {
    setSelectedServices(
      selectedServices.filter((s) => s.service_id !== serviceId)
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/invoices", {
        customer_id: selectedCustomer,
        services: selectedServices,
      });
      alert("Invoice created successfully! ID: " + response.data.invoiceId);
    } catch (error) {
      console.error(error);
      alert("Failed to create invoice.");
    }
  };

  const totalAmount = selectedServices.reduce(
    (total, service) => total + service.price_per_unit * service.quantity,
    0
  );

  return (
    <Box
      sx={{
        maxWidth: "600px", // Limit width
        width: "100%",
        height: "500px", // Limit height
        overflowY: "auto",
        mx: "auto",
        mt: 5,
        p: 3,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Invoice
      </Typography>

      <TextField
        fullWidth
        select
        label="Select Customer"
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
        sx={{ mb: 2 }}
      >
        {customers.map((customer) => (
          <MenuItem key={customer.id} value={customer.id}>
            {customer.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="Select Service"
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
        sx={{ mb: 2 }}
      >
        {services.map((service) => (
          <MenuItem key={service.id} value={service.id}>
            {service.name} - Rs. {service.price_per_unit}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddService}
        sx={{ mb: 2 }}
        fullWidth
      >
        Add Service
      </Button>

      {/* Selected services list */}
      <Box
        sx={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ddd",
          p: 2,
          borderRadius: 1,
        }}
      >
        {selectedServices.length > 0 && (
          <>
            <Typography variant="h6">Selected Services</Typography>

            <Grid container spacing={2}>
              {selectedServices.map((service) => (
                <Grid
                  container
                  item
                  key={service.service_id}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {service.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      type="number"
                      label="Qty"
                      value={service.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          service.service_id,
                          parseInt(e.target.value, 10)
                        )
                      }
                      inputProps={{ min: 1 }}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>
                      Rs. {service.price_per_unit * service.quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => handleRemoveService(service.service_id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Total: Rs. {totalAmount}
      </Typography>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Invoice
      </Button>
    </Box>
  );
};

export default Invoice;
