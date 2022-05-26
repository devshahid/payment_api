import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
const PaymentRequest = () => {
  const history = useNavigate();
  const [field, setField] = useState({
    orderID: "",
    amountUSD: "",
    coinLabel: "",
  });

  const redirectRoute = () => {
    history(
      `/handler?orderID=${field.orderID}&amountUSD=${
        field.amountUSD
      }&coinLabel=${
        field.coinLabel
      }&redirecturl=${"http://localhost:3000/displayData"}&callbackurl=${"http://localhost:3000/displayData"}`
    );
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
            {/* <TextField
              id="standard-basic"
              label="User ID"
              name="userID"
              onBlur={handleInput}
              variant="standard"
            /> */}
            <TextField
              id="standard-basic"
              label="Order ID"
              name="orderID"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Amount (USD)"
              name="amountUSD"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Coin Label"
              name="coinLabel"
              onBlur={handleInput}
              variant="standard"
            />
            <Button variant="contained" onClick={redirectRoute}>
              Checkout
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default PaymentRequest;
