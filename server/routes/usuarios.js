import express from 'express';
import { getUsers, getId, getUserEstudios, getUserTrabajo, updateUser } from '../controllers/usuario.js';

const router = express.Router();

router.get('/find', getUsers)
router.get('/findId', getId)
// router.get('/buscar',getAmigo)
// router.get('/buscarAll',getAmigos)
router.get('/estudios', getUserEstudios)
router.get('/trabajo', getUserTrabajo)
router.put('/actualizar', updateUser)


export default router;