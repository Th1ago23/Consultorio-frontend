import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import routes from './routes'; // Importando o arquivo index.ts de rotas
import dotenv from 'dotenv';
import cors from 'cors'; // Importe o middleware CORS

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes); 

// Middleware de tratamento de erros (deve ser definido POR ÚLTIMO)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log do erro no console do servidor

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(statusCode).json({ error: message });
});

export default app;