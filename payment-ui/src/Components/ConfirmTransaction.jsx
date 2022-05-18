import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
const ConfirmTransaction = () => {
  const [field, setField] = useState({
    txID: "",
    paymentID: "",
    payment_status: "",
    confirmationNumber: "",
  });
  const updateStatus = async () => {
    const response = await axios.post(
      "http://localhost:8000/update-status",
      field
    );
    const data = await response.data;
    console.log(data);
  };
  const handleInput = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container">
        <div>
          <Box
            className="container_outside"
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="standard-basic"
              label="Payment ID"
              name="paymentID"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Transaction ID"
              name="txID"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Payment Status"
              name="payment_status"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Confirmation Number"
              name="confirmationNumber"
              onBlur={handleInput}
              variant="standard"
            />
            <Button variant="contained" onClick={updateStatus}>
              UPDATE STATUS
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default ConfirmTransaction;
