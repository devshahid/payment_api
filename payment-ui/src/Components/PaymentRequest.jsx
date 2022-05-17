import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
const PaymentRequest = () => {
  const history = useNavigate();
  const [field, setField] = useState({
    userID: "",
    orderID: "",
    amount: "",
    coinType: "",
  });

  const redirectRoute = () => {
    history(
      `/handler?userID=${field.userID}&orderID=${field.orderID}&amount=${field.amount}&coinType=${field.coinType}`
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
            <TextField
              id="standard-basic"
              label="User ID"
              name="userID"
              onBlur={handleInput}
              variant="standard"
            />
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
              name="amount"
              onBlur={handleInput}
              variant="standard"
            />
            <TextField
              id="standard-basic"
              label="Coin Type"
              name="coinType"
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

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Payment Gateway</title>
//   </head>
//   <body>
//     <input type="text" id="orderID" placeholder="Enter Order ID" />
//     <input type="text" id="amount" placeholder="Enter Amount ($)" />
//     <input type="text" id="coinType" placeholder="Coin Type" />
//     <button onclick="handleRequest()">Checkout</button>
//   </body>
//   <script>
//
//   </script>
// </html>
