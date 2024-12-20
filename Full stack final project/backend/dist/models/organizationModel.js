"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const organizationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    resources: { type: [{ name: String, amount: Number }], required: true },
    budget: { type: Number, required: true },
});
exports.default = mongoose_1.default.model("Organization", organizationSchema);
//# sourceMappingURL=organizationModel.js.map