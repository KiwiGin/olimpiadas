import express from 'express';
import { getRelacion, addRelacion, deleteRelacion } from '../controllers/relacion.js';

const router = express.Router();

router.get('/', getRelacion)
router.post('/addRela', addRelacion)
router.post('/deleteRela', deleteRelacion)


export default router;