"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.authenticate = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const organizationModel_1 = __importDefault(require("../models/organizationModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    try {
        const { name, password, organization, area } = req.body;
        if (!name || !organization || !password) {
            res.status(400).json({ message: "Missing required fields", success: false });
            return;
        }
        const existingUser = await userModel_1.default.findOne({ name });
        if (existingUser) {
            res.status(400).json({ message: "User name already exists", data: { name }, success: false });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const userOrganization = await organizationModel_1.default.findOne({ name: organization });
        if (!userOrganization) {
            res.status(400).json({ message: "Organization not found", data: { organization }, success: false });
            return;
        }
        const organizationId = userOrganization._id;
        const budget = userOrganization.budget;
        const user = await userModel_1.default.create({
            name,
            password: hashedPassword,
            organization,
            area,
            budget,
            organizationId
        });
        const response = {
            message: "User created successfully",
            success: true,
            data: {
                name,
            },
        };
        res.status(201).json(response);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to save user", success: false });
        return;
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            res.status(400).json({ message: "Missing required fields", success: false });
            return;
        }
        const user = await userModel_1.default.findOne({ name });
        if (!user) {
            res.status(401).json({ message: "Invalid name", success: false });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid name or password", success: false, data: { name, password } });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, organization: user.organization }, process.env.JWT_SECRET || "", { expiresIn: "5h" });
        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 5,
            httpOnly: true
        });
        res.status(200).json({ message: "Login successful", success: true, data: { id: user._id, name: user.name } });
        return;
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Failed to login", success: false });
    }
};
exports.login = login;
const authenticate = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ message: "Missing params", success: false });
            return;
        }
        const user = userModel_1.default.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({ message: "No token provided", success: false });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        if (!decoded) {
            res.status(401).json({ message: "Invalid token", success: false });
            return;
        }
        if (!decoded.id || !decoded.organization) {
            res.status(401).json({ message: "Invalid token", success: false });
            return;
        }
        if (decoded.id !== id) {
            res.status(401).json({ message: "Invalid token", success: false });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token", success: false });
        return;
    }
};
exports.authenticate = authenticate;
const logout = (req, res) => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout successful", success: true });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Failed to logout", success: false });
        return;
    }
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map