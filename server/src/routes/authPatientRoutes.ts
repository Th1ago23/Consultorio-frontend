import express from 'express';
import AuthPatientController from '../controllers/authPatientController';

const router = express.Router();

router.post('/register', AuthPatientController.register);
router.post('/login', AuthPatientController.login);

export default router;
