import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { TextField, CircularProgress, Box } from "@mui/material";
import axios from "axios";
const PaymentHandler = () => {
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const [config, setConfig] = useState({
    paymentStatus: "",
    loader: false,
    convertedAmount: params.get("amount"),
    state: false,
  });

  const USD_TO_KIRIN = 0.1;
  const fetchData = async () => {
    if (config.state) {
      console.log(USD_TO_KIRIN * params.get("amount"));
      let response = await axios.get(
        `http://localhost:8000/request${location.search}`
      );
      let data = await response.data;
      console.log(data);
      if (data.status === "success") {
        setConfig({
          ...config,
          state: false,
          convertedAmount: USD_TO_KIRIN * params.get("amount"),
          loader: false,
          paymentStatus: "Awaiting Payment",
        });
        let response = await axios.get(`http://localhost:8000/payment-status`);
        let data = await response.data;
        if (data.status === "approved") {
          console.log(data);
          setConfig({
            ...config,
            loader: false,
            paymentStatus: "Payment Done successfully",
            convertedAmount: USD_TO_KIRIN * params.get("amount"),
          });
          console.log(config);
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {config.loader ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <div className="handlerContainer">
          <div className="handlerBody">
            <h1>KIRIN PAYMENT GATEWAY</h1>

            <div className="displayDetails">
              <h1>Order ID :</h1>
              <h1>Amount : {config.convertedAmount}</h1>
            </div>
            <div className="bodyDetails">
              <div className="qrCode">
                <QRCode value="www.facebook.com"></QRCode>
              </div>
              <div className="paymentContent">
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Address"
                  // defaultValue={`${location.state.orderID}`}
                />
              </div>
            </div>
            <div>
              <p>{config.paymentStatus}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHandler;
