const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
var cors = require("cors");
app.use(express.json({ limit: "10MB" }));
app.use(cors());

app.use(require("./Route/route"));

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
