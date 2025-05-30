const express = require("express");
const app = express();
const PORT = 4500;
const routes = require("./routes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
