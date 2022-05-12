const express = require("express");
const app = express();
const PORT = 8000;

app.use(express.json({ limit: "10MB" }));

// app.use(cors(corsOpts));
app.get("/getdata", (req, res) => {
  res.json({ name: "shahid", age: "10" });
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
