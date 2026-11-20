
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
    sellProduct
} = require("../controllers/productController");

// Create a new product
router.post("/", validateProduct, createProduct);

// Get all products
router.get("/", getProducts);

// Get low-stock products
router.get("/low-stock", getLowStock);

// Get category summary
router.get("/summary", getCategorySummary);

// Restock a product
router.patch("/:id/restock", restockProduct);

// Sell a product
router.patch("/:id/sell", sellProduct);

// Get a product by ID
router.get("/:id", getProductById);

// Update a product
router.put("/:id", validateProduct, updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;
