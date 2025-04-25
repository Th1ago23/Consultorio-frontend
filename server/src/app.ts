import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes'; // Importando o arquivo index.ts de rotas
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/api', routes); // Usando o router principal

export default app;