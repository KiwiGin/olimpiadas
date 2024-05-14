import express from 'express';
const app = express();
import usuarioRoutes from './routes/usuarios.js';
import contenidoRoutes from './routes/contenidos.js';
import comentarioRoutes from './routes/comentarios.js';
import autenticacionRoutes from './routes/autenticacion.js';
import server from './websock.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


//middlewares
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin: 'https://bdrll2l3-5173.brs.devtunnels.ms/',
    credentials: true
}));
app.use(cookieParser());


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contenidos', contenidoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/autenticacion', autenticacionRoutes);


app.listen(8000, () => {
    console.log('Server is running on port 8000...');
});