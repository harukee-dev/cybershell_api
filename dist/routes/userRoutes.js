"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const usersValidator_1 = require("../validators/usersValidator");
const validate_1 = require("../middlewares/validate");
exports.userRouter = (0, express_1.default)();
exports.userRouter.get('/', (req, res) => {
    res.json(db_1.usersDB);
});
exports.userRouter.post('/', (0, validate_1.validate)(usersValidator_1.createUserSchema), (req, res) => {
    const { username } = req.body;
    const newUser = {
        id: `${Date.now()}`,
        username,
        balance: 0,
        isBanned: false,
    };
    db_1.usersDB.push(newUser);
    res.status(200).json({ message: 'Пользователь успешно создан', user: newUser });
});
exports.userRouter.post('/:id/topup', (0, validate_1.validate)(usersValidator_1.topupSchema), (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    if (db_1.usersDB.filter((el) => el.id === id).length <= 0)
        return res.status(404).json({ message: 'Пользователь не найден' });
    db_1.usersDB.map((el) => {
        if (el.id === id)
            el.balance += amount;
    });
    res.status(200).json({ message: 'Баланс пользователя успешно пополнен' });
});
exports.userRouter.post('/:id/ban', (req, res) => {
    const { id } = req.params;
    console.log(id);
    db_1.usersDB.forEach((user) => {
        if (user.id == id) {
            user.isBanned = true;
            return res.status(200).json({ message: 'Пользователь успешно забанен' });
        }
    });
    res.status(404).json({ message: 'Пользователь не найден' });
});
