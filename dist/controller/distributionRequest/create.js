"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DistributionRequest_1 = require("../../models/DistributionRequest");
// inputs email , password
async function create(req, res, next) {
    try {
        // user must be authenticted as farmer
        const reqFarmer = req["userData"]._id;
        const reqDistributor = req.params.distributor; //eq id
        const { cropName, description, expectedPriceTotal, expectedProduce, location } = req.body;
        const eqRequestRecord = new DistributionRequest_1.default({
            cropName,
            description,
            location,
            expectedPriceTotal,
            expectedProduce,
            farmer: reqFarmer,
            distributor: reqDistributor
        });
        const eqRequestDoc = await eqRequestRecord.save();
        return res.status(200).json({
            message: "New Distribution request created",
            data: eqRequestDoc
        });
    }
    catch (err) {
        req["status"] = 400;
        next(err);
    }
}
exports.create = create;
//# sourceMappingURL=create.js.map