const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 4500;
const routes = require("./routes");


app.use(express.json());

app.use("/api", routes);

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });

app.listen(PORT,  () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
