import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const saltRounds = 10;

class AuthPatientController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        cpf,
        phone,
        birthDate,
        address,
        city,
        state,
        zipCode,
        country,
        password,
      } = req.body;

      const existingPatient = await prisma.patient.findUnique({ where: { email } });
      if (existingPatient) {
        res.status(400).json({ error: 'Paciente já cadastrado' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const patient = await prisma.patient.create({
        data: {
          name,
          email,
          cpf,
          phone,
          birthDate: new Date(birthDate),
          address,
          city,
          state,
          zipCode,
          country,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'Paciente registrado com sucesso', id: patient.id });
    } catch (error) {
      console.error('Erro ao registrar paciente:', error);
      res.status(500).json({ error: 'Erro ao registrar paciente' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const patient = await prisma.patient.findUnique({ where: { email } });
      if (!patient) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      
      const passwordMatch = await bcrypt.compare(password, patient.password);
      if (!passwordMatch) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET não está definido, verifique o arquivo .env');
      }
      const token = jwt.sign({ patientId: patient.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login do paciente:', error);
      res.status(500).json({ error: 'Erro ao fazer login do paciente' });
    }
  }
  async me(req: Request, res: Response): Promise<void> {
    const { patientId } = req as any;
  
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          cpf: true,
          birthDate: true,
          address: true,
          city: true,
          state: true,
          zipCode: true,
          country: true,
          createdAt: true,
        },
      });
  
      if (!patient) {
        res.status(404).json({ error: 'Paciente não encontrado' });
        return;
      }
  
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados do paciente' });
    }
  }
  
}



export default new AuthPatientController();
