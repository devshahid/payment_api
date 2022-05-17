import "./App.css";
import "../src/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PaymentRequest from "./Components/PaymentRequest";
import PaymentHandler from "./Components/PaymentHandler-Basic";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<PaymentRequest />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/handler" element={<PaymentHandler />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
