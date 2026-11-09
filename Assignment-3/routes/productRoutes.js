const express = require("express");
const router = express.Router();

const validateProduct = require("../middleware/validateProduct");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLowStock,
  getCategorySummary,
  restockProduct,
  sellProduct,
} = require("../controllers/productController");

router.post("/", validateProduct, createProduct);
router.get("/", getProducts);
router.get("/low-stock", getLowStock);
router.get("/category-summary", getCategorySummary);
router.patch("/:id/restock", restockProduct);
router.patch("/:id/sell", sellProduct);
router.get("/:id", getProductById);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;