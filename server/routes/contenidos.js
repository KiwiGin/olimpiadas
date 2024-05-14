import express from 'express';
import { getContenidos } from '../controllers/contenido.js';

const router = express.Router();

router.get('/', getContenidos)


export default router;