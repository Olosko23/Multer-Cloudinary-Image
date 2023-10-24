const express = require("express");
const cors = require("cors");
const Product = require("./route/productRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URI = process.env.MONGO_URI;

mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Mongo DB Connected & Server Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log({
      message: error.message,
    });
  });

app.use("/", Product);
app.get("/", async (req, res) => {
  res.status(200).json("API Running");
});
