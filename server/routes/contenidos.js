import express from 'express';
import { addPost, getPosts } from '../controllers/contenido.js';

const router = express.Router();

router.get('/getPosts', getPosts)
router.post('/addPost', addPost)


export default router;