const Product = require("../models/Products");

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getProducts = async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        const products = await Product.find(filter)
            .sort(sort || "name")
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Product.countDocuments(filter);

        res.status(200).json({
            total,
            page: Number(page),
            products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getLowStock = async (req, res) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$reorderLevel"]
            }
        });

        res.status(200).json({
            count: products.length,
            lowStockItems: products
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getCategorySummary = async (req, res) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: { $multiply: ["$price", "$quantity"] }
                    }
                }
            }
        ]);

        res.status(200).json(summary);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const restockProduct = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Restock quantity must be a positive whole number"
            });
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { $inc: { quantity: quantity } },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Stock updated successfully",
            product
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const sellProduct = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({
                message: "Sale quantity must be a positive whole number"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: quantity }
            },
            {
                $inc: { quantity: -quantity }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(400).json({
                message: "Product not found or insufficient stock"
            });
        }

        res.status(200).json({
            message: "Product sold successfully",
            product
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getLowStock,
    getCategorySummary,
    restockProduct,
    sellProduct
};