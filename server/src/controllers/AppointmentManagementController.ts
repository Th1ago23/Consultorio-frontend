import { Request, Response } from "express";
import { PrismaClient, AppointmentStatus } from "@prisma/client";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

class AppointmentManagementController {
  async listPending(req: AuthRequest, res: Response): Promise<void> {
    try {
      const pendingRequests = await prisma.appointmentRequest.findMany({
        where: { status: AppointmentStatus.PENDING },
        include: { patient: true },
      });
      res.status(200).json(pendingRequests);
    } catch (error) {
      console.error("Erro ao listar solicitações pendentes:", error);
      res.status(500).json({ error: "Erro ao listar solicitações pendentes." });
    }
  }

  async approve(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { requestId } = req.params;

      const appointmentRequest = await prisma.appointmentRequest.findUnique({
        where: { id: parseInt(requestId) },
      });

      if (!appointmentRequest) {
        res.status(404).json({ error: "Solicitação não encontrada." });
        return;
      }

      // *** Lógica de Negócios Adicional ***

      // 1. Verificar se o horário ainda está disponível (evitar double-booking)
      const isTimeSlotFree = await this.checkTimeSlotAvailability(
        appointmentRequest.patientId,
        appointmentRequest.date,
        appointmentRequest.time
      );
      if (!isTimeSlotFree) {
        res.status(409).json({ error: "O horário solicitado já está ocupado." });
        return;
      }

      // 2. Verificar se o horário está dentro do horário de funcionamento (se aplicável)
      const isWithinWorkingHours = this.checkWorkingHours(appointmentRequest.date, appointmentRequest.time);
      if (!isWithinWorkingHours) {
        res.status(400).json({ error: "O horário solicitado está fora do horário de funcionamento." });
        return;
      }

      // Criar a consulta real
      const newAppointment = await prisma.appointment.create({
        data: {
          patientId: appointmentRequest.patientId,
          date: appointmentRequest.date,
          time: appointmentRequest.time,
          notes: appointmentRequest.notes,
        },
      });

      // Atualizar o status da solicitação
      await prisma.appointmentRequest.update({
        where: { id: parseInt(requestId) },
        data: { status: AppointmentStatus.CONFIRMED, appointmentId: newAppointment.id },
      });

      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Erro ao aprovar consulta:", error);
      res.status(500).json({ error: "Erro ao aprovar consulta." });
    }
  }

  async reject(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { requestId } = req.params;

      const appointmentRequest = await prisma.appointmentRequest.findUnique({
        where: { id: parseInt(requestId) },
      });

      if (!appointmentRequest) {
        res.status(404).json({ error: "Solicitação não encontrada." });
        return;
      }

      await prisma.appointmentRequest.update({
        where: { id: parseInt(requestId) },
        data: { status: AppointmentStatus.CANCELLED},
      });

      res.status(200).json({ message: "Solicitação de consulta rejeitada com sucesso." });
    } catch (error) {
      console.error("Erro ao rejeitar consulta:", error);
      res.status(500).json({ error: "Erro ao rejeitar consulta." });
    }
  }

  async reschedule(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { requestId } = req.params;
      const { newDate, newTime } = req.body;

      const appointmentRequest = await prisma.appointmentRequest.findUnique({
        where: { id: parseInt(requestId) },
      });

      if (!appointmentRequest) {
        res.status(404).json({ error: "Solicitação não encontrada." });
        return;
      }

      // *** Lógica de Negócios Adicional para Reagendamento ***

      // 1. Verificar disponibilidade para a nova data e hora
      const isNewTimeSlotFree = await this.checkTimeSlotAvailability(
        appointmentRequest.patientId,
        new Date(newDate),
        newTime
      );
      if (!isNewTimeSlotFree) {
        res.status(409).json({ error: "O novo horário selecionado já está ocupado." });
        return;
      }

      // 2. Verificar se o novo horário está dentro do horário de funcionamento
      const isWithinWorkingHours = this.checkWorkingHours(new Date(newDate), newTime);
      if (!isWithinWorkingHours) {
        res.status(400).json({ error: "O novo horário selecionado está fora do horário de funcionamento." });
        return;
      }

      await prisma.appointmentRequest.update({
        where: { id: parseInt(requestId) },
        data: { date: new Date(newDate), time: newTime, status: AppointmentStatus.RESCHEDULED },
      });

      res.status(200).json({ message: "Solicitação de consulta reagendada com sucesso." });
    } catch (error) {
      console.error("Erro ao reagendar consulta:", error);
      res.status(500).json({ error: "Erro ao reagendar consulta." });
    }
  }

  // Funções auxiliares (a serem implementadas com a lógica real)
  private async checkTimeSlotAvailability(patientId: number, date: Date, time: string): Promise<boolean> {
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        patientId,
        date,
        time,
      },
    });
    return !existingAppointment;
  }

  private checkWorkingHours(date: Date, time: string): boolean {
    // *** Lógica para verificar o horário de funcionamento ***
    // Isso pode envolver verificar o dia da semana e se o horário está dentro de um intervalo específico.
    // Você precisará definir a lógica de horário de funcionamento da sua mãe aqui.
    return true; // Simulação: sempre dentro do horário de funcionamento
  }
}

export default new AppointmentManagementController();