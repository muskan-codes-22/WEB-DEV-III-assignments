const validateProduct = (req, res, next) => {

    const {
        name,
        sku,
        category,
        price,
        quantity,
        reorderLevel,
        supplier
    } = req.body || {};

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

    if (price !== undefined && (
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price <= 0
    )) {
        return res.status(400).json({
            message: "Price must be a positive number"
        });
    }

    if (quantity !== undefined && (
        !Number.isInteger(quantity) ||
        quantity < 0
    )) {
        return res.status(400).json({
            message: "Quantity must be a non-negative whole number"
        });
    }

    if (reorderLevel !== undefined && (
        !Number.isInteger(reorderLevel) ||
        reorderLevel < 0
    )) {
        return res.status(400).json({
            message: "Reorder level must be a non-negative whole number"
        });
    }

    next();
};

module.exports = validateProduct;
