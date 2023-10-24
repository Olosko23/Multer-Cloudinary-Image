const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} = require("../controller/productController");

router.post("/products", createProduct);
router.get("/products/:id", getProductById);
router.patch("/products/:id", updateProductById);
router.delete("/products/:id", deleteProductById);
router.get("/products", getAllProducts);

module.exports = router;
