import express from 'express';
import { getRelacion, addRelacion } from '../controllers/relacion.js';

const router = express.Router();

router.get('/', getRelacion)
router.post('/addRela', addRelacion)


export default router;