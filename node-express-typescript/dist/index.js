"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const finnhub = require('finnhub');
dotenv_1.default.config();
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.finnhub_API_key;
const finnhubClient = new finnhub.DefaultApi();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is running.');
});
app.get('/api/test', (req, res) => {
    res.send('This is the API test message.');
});
app.get('/api/finntest', (req, res) => {
    try {
        finnhubClient.quote("AAPL", (error, data, response) => {
            console.log(data);
            res.send({ price: data.c });
        });
    }
    catch (error) {
        console.log(`Error in /api/finntest endpoint: ${error}`);
        res.send({ price: 0 });
    }
});
app.get('/api/quote', (req, res) => {
    try {
        const symbol = String(req.query.symbol);
        finnhubClient.quote(symbol, (error, data, response) => {
            console.log(data);
            res.send({ price: data.c });
        });
    }
    catch (error) {
        console.log(`Error in /api/quote endpoint: ${error}`);
        res.send({ price: 0 });
    }
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
