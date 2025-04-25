import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Vamos usar JWT para gerar tokens de acesso

const prisma = new PrismaClient();
const saltRounds = 10; // Número de rounds para o bcrypt

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: 'Usuário já cadastrado' });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Criar o novo usuário (por padrão, isAdmin é false)
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'Usuário registrado com sucesso', userId: newUser.id, email: newUser.email });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Encontrar o usuário pelo email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      // Comparar a senha fornecida com a senha hash no banco de dados
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      // Gerar um token JWT (você precisará de uma chave secreta)
      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 'JWT_SECRET', { expiresIn: '1h' }); // Mantenha seu segredo em um ambiente seguro

      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

  // Futuramente, podemos adicionar um método de logout (se necessário, geralmente no frontend)
}

export default new AuthController();