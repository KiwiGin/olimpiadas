import express from 'express';
import { getContenidos, postear } from '../controllers/contenido.js';

const router = express.Router();

router.get('/', getContenidos)
router.post('/', postear)


export default router;