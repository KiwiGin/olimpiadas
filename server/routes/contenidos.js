import express from 'express';
import multer from 'multer';
import { db, storage, uploadImageAndSaveToFirestore } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import { getPosts } from '../controllers/contenido.js';

const router = express.Router();
const upload = multer();

router.get('/get', getPosts)
router.post('/addPost', upload.single('media'), async (req, res) => {
    try {
        // Accede al archivo subido a través de req.file
        const file = req.file;
        console.log("Archivo recibido:", file);

        // Verifica si se subió un archivo
        if (!file) {
            return res.status(400).json({ message: 'No se ha seleccionado ningún archivo' });
        }

        // Sube el archivo a Firebase Storage y obtiene la URL de descarga
        const downloadURL = await uploadImageAndSaveToFirestore(file, { contentType: file.mimetype });

        console.log("URL de descarga:", downloadURL);

        //sacar id del usuario
        const usuarioIdQuery = query(collection(db, 'usuarios'), where('email', '==', req.body.email_usuario));
        const usuarioIdSnapshot = await getDocs(usuarioIdQuery);
        const usuarioId = usuarioIdSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("ID del usuario: ", usuarioId[0].id);

        // Guarda la URL de descarga en Firestore
        const date = new Date();
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date - offset).toISOString().slice(0, -1);
        await addDoc(collection(db, 'contenidos'), {
            usuario_id: usuarioId[0].id,
            email_usuario: req.body.email_usuario,
            nombre_usario: req.body.nombre,
            descripcion: req.body.desc,
            media: downloadURL, // Aquí se guarda la URL de descarga del archivo
            fecha_subida: localISOTime
        });

        res.status(200).json({ message: 'Posteado', downloadURL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al postear' });
    }
});


export default router;