const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
var cors = require("cors");
app.use(express.json({ limit: "10MB" }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("payment-ui/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "payment-ui", "build", "index.html"))
  );
}

app.use(require("./Route/route"));

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
