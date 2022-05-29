const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
var cors = require("cors");
app.use(express.json({ limit: "10MB" }));
app.use(cors());

app.use(require("./Route/route"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("payment-ui/build"));
}

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
