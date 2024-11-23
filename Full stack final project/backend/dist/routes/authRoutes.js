"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/register", authController_1.register);
authRoutes.post("/login", authController_1.login);
authRoutes.post("/logout", authController_1.logout);
exports.default = authRoutes;
//# sourceMappingURL=authRoutes.js.map