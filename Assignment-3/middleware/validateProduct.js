const validateProduct = (req, res, next) => {

    const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty"
        });
    }

    if (req.method === "POST") {
        if (
            !name ||
            !sku ||
            !category ||
            price === undefined ||
            quantity === undefined ||
            reorderLevel === undefined ||
            !supplier
        ) {
            return res.status(400).json({
                message: "Please provide all required product fields"
            });
        }
    }

    next();
};

module.exports = validateProduct;