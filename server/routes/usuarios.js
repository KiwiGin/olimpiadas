import express from 'express';
import { getUser, getUserEstudios, getUserTrabajo, actualizar, getAmigo } from '../controllers/usuario.js';

const router = express.Router();

router.get('/find', getUser)
router.get('/buscar',getAmigo)
router.get('/estudios', getUserEstudios)
router.get('/trabajo', getUserTrabajo)
router.post('/actualizar', actualizar)


export default router;