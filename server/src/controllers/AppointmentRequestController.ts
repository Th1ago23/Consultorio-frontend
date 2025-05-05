import { Request, Response } from "express";
import { AppointmentStatus, PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware"; // Importe seu middleware de autenticação principal

const prisma = new PrismaClient();

class AppointmentRequestController {
  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { date, time, notes } = req.body;
      const patientId = req.patientId;
  
      if (!patientId || !date || !time) {
        res.status(400).json({ error: "Paciente, data e hora são obrigatórios." });
        return;
      }
  
      const patient = await prisma.patient.findUnique({ where: { id: patientId } });
      if (!patient) {
        res.status(404).json({ error: "Paciente não encontrado." });
        return;
      }
  
      const dateObj = new Date(date);
  
      const isDateAvailable = await this.checkDateAvailability(dateObj);
      const isTimeAvailable = await this.checkTimeAvailability(dateObj, time);
  
      if (!isDateAvailable || !isTimeAvailable) {
        res.status(400).json({ error: "Data ou hora indisponível." });
        return;
      }
  
      const appointmentRequest = await prisma.appointmentRequest.create({
        data: {
          patientId: patientId,
          date: dateObj,
          time,
          notes,
          status: AppointmentStatus.PENDING,
        },
      });
  
      console.log("Consulta criada:", appointmentRequest);
  
      res.status(201).json(appointmentRequest);
    } catch (error: unknown) {
      console.error("Erro ao solicitar consulta:", error);
      res.status(500).json({ error: "Erro ao solicitar consulta." });
    }
  }

  async listPatientAppointments(req: AuthRequest, res: Response): Promise<void> {
    try {
      const patientId = req.patientId;
      console.log("Listando consultas para o paciente ID (backend):", patientId);

      if (!patientId) {
        res.status(401).json({ error: "Paciente não autenticado." });
        return;
      }
      console.log("Paciente ID usado na consulta Prisma:", patientId);

      const consultas = await prisma.appointmentRequest.findMany({
        where: {
          patientId: patientId, // Certifique-se de que esta linha está correta
        },
        include: {
          patient: true,
        },
        orderBy: { date: 'asc' },
      });

      console.log("Consultas encontradas (backend):", consultas);
      console.log("Número de consultas encontradas (backend):", consultas.length);
      res.status(200).json(consultas);
    } catch (error) {
      console.error("Erro ao listar consultas do paciente:", error);
      res.status(500).json({ error: "Erro ao listar consultas do paciente." });
    }
  }

  private async checkDateAvailability(date: Date): Promise<boolean> {
    return true; // lógica futura
  }

  private async checkTimeAvailability(date: Date, time: string): Promise<boolean> {
    return true; // lógica futura
  }
}

export default new AppointmentRequestController();