import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import jwt from 'jsonwebtoken'

export const getComments = async (req, res) => {
    console.log("post_id: "+req.query.postId);
    
    try {
        const usuariosQuery = query(collection(db, 'usuarios'));
        const usuariosSnapshot = await getDocs(usuariosQuery);
        const usuarios = usuariosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // //mis comentarios
        // const misComentariosQuery = query(collection(db, 'contenidos'), where('email_usuario', '==', userInfo.id));
        // const misPostsSnapshot = await getDocs(misPostsQuery);
        // const misPosts = misPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const ComentariosPromises = usuarios.map(async (usuario) => {
            const comentarioQuery = query(collection(db, 'comentarios'), where('email_usuario', '==', usuario.email), where('post_id', '==', req.query.postId));
            const comentarioSnapshot = await getDocs(comentarioQuery);
            const comentarios= comentarioSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return comentarios;
        });

        const comentariosAll = await Promise.all(ComentariosPromises);

        const allcomentarios = [...comentariosAll.flat()];

        allcomentarios.sort((a, b) => new Date(b.fecha_subida) - new Date(a.fecha_subida));

        return res.status(200).json(allcomentarios);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los comentarios' });
    }
};

export const addComment = async (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('No hay token');

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if(err) return res.status(403).json('Token no válido');
        try {
            const date = new Date();
            const offset = date.getTimezoneOffset() * 60000;
            const localISOTime = new Date(date - offset).toISOString().slice(0, -1);
            await addDoc(collection(db, 'comentarios'), {
                post_id: req.body.post_id,
                email_usuario: req.body.email_usuario,
                nombre_usuario: req.body.nombre_usuario,
                comentario: req.body.comentario,
                fecha_subida: localISOTime
            });
            console.log('Comentario agregado');
        
            res.status(200).json({ message: 'Comentario agregado' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al agregar el comentario' });
        }
    });
    
};