import express from 'express';
const app = express();
import usuarioRoutes from './routes/usuarios.js';
import contenidoRoutes from './routes/contenidos.js';
import comentarioRoutes from './routes/comentarios.js';
import autenticacionRoutes from './routes/autenticacion.js';
import relacionRoutes from './routes/relacion.js';
import likeRoutes from './routes/likes.js';
import server from './websock.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';


//middlewares
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contenidos', contenidoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/autenticacion', autenticacionRoutes);
app.use('/api/relacion', relacionRoutes);
app.use('/api/likes', likeRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000...');
});