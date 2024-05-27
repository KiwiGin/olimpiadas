import express from 'express';
import {addRelation, getRelation, deleteRelation} from '../controllers/relacion.js';

const router = express.Router();

router.get('/getRelation', getRelation)
router.post('/addRelation', addRelation)
router.delete('/deleteRelation', deleteRelation)


export default router;