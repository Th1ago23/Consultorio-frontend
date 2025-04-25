import express from 'express';
import patientRoutes from './patientRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);

export default router;