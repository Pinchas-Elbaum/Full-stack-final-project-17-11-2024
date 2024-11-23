"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialDataToDB = void 0;
const fs_1 = __importDefault(require("fs"));
const missillesModel_1 = __importDefault(require("../models/missillesModel"));
const organizationModel_1 = __importDefault(require("../models/organizationModel"));
const initialDataToDB = async () => {
    try {
        const [missileCount, organizationCount] = await Promise.all([
            missillesModel_1.default.countDocuments(),
            organizationModel_1.default.countDocuments()
        ]);
        if (missileCount === 0 && organizationCount === 0) {
            const missileData = fs_1.default.readFileSync("src/data/missiles.json", 'utf-8');
            const missiles = JSON.parse(missileData);
            const organizationData = fs_1.default.readFileSync("src/data/organizations.json", 'utf-8');
            const organizations = JSON.parse(organizationData);
            await Promise.all([
                missillesModel_1.default.insertMany(missiles),
                organizationModel_1.default.insertMany(organizations)
            ]);
            console.log("Data inserted successfully");
        }
        else {
            console.log("Data already exists in the database. No insertion needed.");
        }
    }
    catch (error) {
        console.error("Error inserting data:", error);
    }
};
exports.initialDataToDB = initialDataToDB;
//# sourceMappingURL=initialDataToDB.js.map