"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./tools/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const initialDataToDB_1 = require("./data/initialDataToDB");
dotenv_1.default.config({
    path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env",
});
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use('/auth', authRoutes_1.default);
exports.app.use('/api', dataRoutes_1.default);
exports.app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});
(0, database_1.connectToDatabase)();
(0, initialDataToDB_1.initialDataToDB)();
const PORT = process.env.PORT || 3000;
exports.server = exports.app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map