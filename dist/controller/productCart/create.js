"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductCart_1 = require("../../models/ProductCart");
// inputs email , password
async function create(req, res, next) {
    try {
        // user must be authenticted as farmer
        const farmer = req["userData"]._id;
        const { products, deliveryAddress, paymentAddress } = req.body; // products should be {id , quantity}[]
        const cart = await ProductCart_1.default.findOne({ farmer });
        cart.create(products, deliveryAddress, paymentAddress);
        const cartRecord = await cart.save();
        return res.status(200).json({
            message: "Cart refreshed",
            farmer,
            cart: cartRecord
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
//# sourceMappingURL=create.js.map