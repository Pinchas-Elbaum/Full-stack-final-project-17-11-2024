"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const missileSchema = new mongoose_1.default.Schema({
    name: { type: String },
    description: { type: String },
    speed: { type: Number },
    intercepts: { type: [String], required: true },
    price: { type: Number },
});
exports.default = mongoose_1.default.model("Missile", missileSchema);
//# sourceMappingURL=missillesModel.js.map