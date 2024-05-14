import express from 'express';
import { getUser } from '../controllers/usuario.js';

const router = express.Router();

router.get('/find/:usuarioId', getUser)


export default router;