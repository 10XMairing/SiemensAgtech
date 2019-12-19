"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Distributor_1 = require("../../models/Distributor");
// inputs email , password
async function updateProfile(req, res, next) {
    try {
        // must be logged in as distributor
        const id = req["userData"]._id;
        const { firstName, lastName, businessName, isAvailable, acceptedCrops } = req.body;
        const DistributorDoc = await Distributor_1.default.findByIdAndUpdate(id, req.body);
        return res.status(200).json({
            message: "Updated distributor",
            data: Object.keys(req.body)
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.updateProfile = updateProfile;
//# sourceMappingURL=updateProfile.js.map