import express from 'express';
import patientRoutes from './patientRoutes';
import authRoutes from './authRoutes';
import authPatientRoutes from './authPatientRoutes';
import { authenticateToken } from '../middleware/authMiddleware';
import AuthPatientController from '../controllers/authPatientController';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/auth-patient', authPatientRoutes);
router.use('/patients', patientRoutes);
router.get('/me', authenticateToken, AuthPatientController.me);

export default router;
