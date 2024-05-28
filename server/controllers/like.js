import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import jwt from 'jsonwebtoken'

export const getLikes = async (req, res) => {
    // console.log('Obteniendo likes');
    // console.log('POSTID: '+req.query.postId);
    try {
        const q = query(collection(db, 'likes'), where('post_id', '==', req.query.postId));
        const likesSnapshot = await getDocs(q);
        // if(likesSnapshot.empty) {
        //     console.log('No se encontraron likes');
        //     return res.status(200).json(null);
        // }
        //ARREGLAR
        // const likes = likesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data().email_usuario }));
        // const likesComido = likesSnapshot.map((doc) => doc.data().email_usuario);
        const likes = []
        likesSnapshot.forEach((doc) => {
            likes.push(doc.data().email_usuario);
        });
        // console.log('NYAS:');
        // console.log(likes);
        res.status(200).json(likes);
        
    } catch (error) {
        console.log('Error al obtener los likes');
        res.status(500).json({ message: 'Error al obtener los likes' });
    }
};

export const addLike = async (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('No hay token');

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        console.log('Agregando like');
        console.log(userInfo)
        if(err) return res.status(403).json('Token no válido');
        try {
            // const date = new Date();
            // const offset = date.getTimezoneOffset() * 60000;
            // const localISOTime = new Date(date - offset).toISOString().slice(0, -1);
            await addDoc(collection(db, 'likes'), {
                //email_usuario: userInfo.email,
                //post_id: req.body.postId,
                post_id: req.body.postId,
                email_usuario: userInfo.id,
                nombre_usuario: req.body.nombre_usuario,
                // fecha_subida: localISOTime
            });
            console.log('Like agregado');
        
            res.status(200).json({ message: 'Like agregado' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al agregar el like' });
        }
    });
};

export const deleteLike = async (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('No hay token');

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if(err) return res.status(403).json('Token no válido');
        try {
            // console.log('req.query.postId:', req.query.postId);
            // console.log('userInfo.id:', userInfo.id);
            const q = query(collection(db, 'likes'), where('post_id', '==', req.query.postId), where('email_usuario', '==', userInfo.id));
            // console.log('Eliminando like');
            const likesSnapshot = await getDocs(q);
            if(likesSnapshot.empty) {
                console.log('No se encontraron likes');
                return res.status(200).json('No se encontraron likes');
            }
            
            // console.log(likesSnapshot);
            likesSnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            console.log('Like eliminado');
            res.status(200).json({ message: 'Like eliminado' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al eliminar el like' });
        }
    });
};