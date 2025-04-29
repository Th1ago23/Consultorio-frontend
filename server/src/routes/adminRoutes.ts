import express from 'express';
import AppointmentManagementController from '../controllers/AppointmentManagementController';
import { authenticateToken, authenticateAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Listar todas as solicitações de consulta pendentes (requer autenticação e ser admin)
router.get('/appointment-requests/pending', authenticateToken, authenticateAdmin, AppointmentManagementController.listPending);

// Aprovar uma solicitação de consulta (requer autenticação e ser admin)
router.post('/appointment-requests/:requestId/approve', authenticateToken, authenticateAdmin, AppointmentManagementController.approve);

// Rejeitar uma solicitação de consulta (requer autenticação e ser admin)
router.post('/appointment-requests/:requestId/reject', authenticateToken, authenticateAdmin, AppointmentManagementController.reject);

// Reagendar uma solicitação de consulta (requer autenticação e ser admin)
router.post('/appointment-requests/:requestId/reschedule', authenticateToken, authenticateAdmin, AppointmentManagementController.reschedule);

export default router;