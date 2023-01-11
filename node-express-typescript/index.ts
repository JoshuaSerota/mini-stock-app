import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running.');
});

app.get('/api/test', (req: Request, res: Response) => {
  res.send('This is the API test message.');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});