require("dotenv").config();
const express = require("express");
const middlewarConfig = require("../src/config/middlewareConfig");
const app = express();
PORT = process.env.PORT || 5050;

middlewarConfig(app);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Server is stoped du to ", err);
  }
  console.log("SERVER has been started! on port ", PORT);
});
