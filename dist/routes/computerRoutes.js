"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computerRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const computersValidator_1 = require("../validators/computersValidator");
const validate_1 = require("../middlewares/validate");
exports.computerRouter = (0, express_1.default)();
exports.computerRouter.get('/', (req, res) => {
    res.status(200).json(db_1.computersDB);
});
exports.computerRouter.get('/zone/:zoneName', (req, res) => {
    const { zoneName } = req.params;
    const filteredComputers = db_1.computersDB.filter((el) => el.zone === zoneName);
    if (filteredComputers.length > 0)
        res.status(200).json(filteredComputers);
    else
        res.status(400).json({ message: 'Такой зоны нет или она пустая' });
});
exports.computerRouter.post('/', (0, validate_1.validate)(computersValidator_1.createPcSchema), (req, res) => {
    const { name, zone, pricePerHour } = req.body;
    const newPC = {
        id: `${Date.now()}`,
        name,
        zone,
        status: 'FREE',
        pricePerHour
    };
    db_1.computersDB.push(newPC);
    res.status(201).json({ message: 'ПК успешно добавлен', PC: newPC });
});
