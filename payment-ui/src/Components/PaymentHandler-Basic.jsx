import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import QRCode from "react-qr-code";
import { TextField, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PaymentHandler = () => {
  const callbackUrl = "http://localhost:3000/displayData";
  const location = useLocation();
  const search = location.search;
  const params = new URLSearchParams(search);
  const [config, setConfig] = useState({
    orderID: params.get("orderID"),
    paymentStatus: "Awaiting Payment",
    loader: true,
    convertedAmount: params.get("amountUSD"),
    state: true,
  });
  const USD_TO_KIRIN = 0.1;
  const fetchData = async () => {
    if (config.state) {
      console.log(USD_TO_KIRIN * params.get("amountUSD"));
      let response = await axios.get(
        `http://localhost:8000/insertdetails${location.search}`
      );
      let data = await response.data;
      console.log(data);
      if (data.status === "success") {
        setConfig({
          ...config,
          state: false,
          convertedAmount: USD_TO_KIRIN * params.get("amountUSD"),
          loader: false,
          paymentStatus: "Awaiting Payment",
        });
        let response = await axios.get(`http://localhost:8000/payment-status`);
        let data = await response.data;
        if (data.status === "approved") {
          console.log(data);
          toast.success("Payment Successfully Paid!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setConfig({
            ...config,
            loader: false,
            paymentStatus: "Redirecting! Please wait...",
            convertedAmount: USD_TO_KIRIN * params.get("amount"),
          });
          const callbackUrlData = new URLSearchParams(data);
          setTimeout(function () {
            window.location.replace(
              `${callbackUrl}?${callbackUrlData.toString()}`
            );
          }, 5000);
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
        <div className="displayCircularLoader">
          <Box sx={{ display: "flex" }} className="circularLoader">
            <CircularProgress size="6rem" />
          </Box>
        </div>
      ) : (
        <div className="handlerContainer">
          <div className="handlerBody">
            <h1>PAYMENT GATEWAY</h1>
            <div className="paymentDetails">
              <div className="displayDetails">
                <h1>Order ID :{config.orderID}</h1>
                <h1>Amount : {config.convertedAmount.toFixed(8)} KIRIN</h1>
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
                    defaultValue="457896554151848161548"
                  />
                </div>
              </div>
            </div>
            <div className="paymentStatus">
              <Box sx={{ width: "100%" }} className="paymentStatus">
                <LinearProgress />
                <p>{config.paymentStatus}</p>
              </Box>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHandler;
