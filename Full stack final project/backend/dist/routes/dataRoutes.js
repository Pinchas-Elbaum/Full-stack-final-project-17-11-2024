"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dataController_1 = require("../controllers/dataController");
const authController_1 = require("../controllers/authController");
const dataRoutes = (0, express_1.Router)();
dataRoutes.get("/user/:id", dataController_1.getUser);
dataRoutes.get("/missiles", dataController_1.getAllMissiles);
dataRoutes.get("/organizationMissiles/:id", dataController_1.getOrganizationMissiles);
dataRoutes.put("/buyMissile/:id", authController_1.authenticate, dataController_1.buyMissile);
exports.default = dataRoutes;
//# sourceMappingURL=dataRoutes.js.map