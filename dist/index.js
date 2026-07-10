"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const computerRoutes_1 = require("./routes/computerRoutes");
const userRoutes_1 = require("./routes/userRoutes");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/computers', computerRoutes_1.computerRouter);
app.use('/api/users', userRoutes_1.userRouter);
app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
});
app.listen(PORT, () => {
    console.log(`Сервер запущен на порте ${PORT}`);
});
