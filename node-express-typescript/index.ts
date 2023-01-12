import express, { Express, Request, Response } from 'express';
import { Query } from 'express-serve-static-core';
import dotenv from 'dotenv';
const finnhub = require('finnhub');

dotenv.config();

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.finnhub_API_key;
const finnhubClient = new finnhub.DefaultApi();

interface QuoteData {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
  d: number;
  dp: number;
}

interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}

const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running.');
});

app.get('/api/test', (req: Request, res: Response) => {
  res.send('This is the API test message.');
});

app.get('/api/finntest', (req: Request, res: Response) => {
  try {
    finnhubClient.quote("AAPL", (error: any, data: QuoteData, response: any) => {
      console.log(data);
      res.send({ price: data.c });
    });
  } catch (error) {
    console.log(`Error in /api/finntest endpoint: ${error}`);
    res.send({ price: 0 });
  }
}); 

app.get('/api/quote', (req: TypedRequestQuery<{ symbol: string }>, res: Response) => {
  try {
    const symbol: string = String(req.query.symbol);
    finnhubClient.quote(symbol, (error: any, data: QuoteData, response: any) => {
      console.log(data);
      res.send({ price: data.c });
    });
  } catch (error) {
    console.log(`Error in /api/quote endpoint: ${error}`);
    res.send({ price: 0 });
  }
}); 

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});