import express from 'express';
const app = express();
import usuarioRoutes from './routes/usuarios.js';
import contenidoRoutes from './routes/contenidos.js';
import comentarioRoutes from './routes/comentarios.js';
import autenticacionRoutes from './routes/autenticacion.js';
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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../webSenati/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + file.originalname)
    }
})
  
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/contenidos', contenidoRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/autenticacion', autenticacionRoutes);


app.listen(8000, () => {
    console.log('Server is running on port 8000...');
});