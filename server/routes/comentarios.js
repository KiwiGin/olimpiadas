import express from 'express';
import { getComments, addComment } from '../controllers/comentario.js';

const router = express.Router();

router.get('/', getComments)
router.post('/addComment', addComment)


export default router;