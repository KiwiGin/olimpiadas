import { db, storage, uploadImageAndSaveToFirestore } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
    // const email_usuario_perfil = req.params.userId;
    // console.log("userId: "+email_usuario_perfil);
    console.log("USER ID:" + req.query.userId);
    const email_usuario_perfil = req.query.userId;
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('No hay token');

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if(err) return res.status(403).json('Token no válido');
        console.log("UserInfo cuack:");
        console.log(userInfo.id);
        try {
            if (email_usuario_perfil) {
                const q = query(collection(db, 'contenidos'), where('email_usuario', '==', email_usuario_perfil), orderBy('fecha_subida', 'desc'));
                const querySnapshot = await getDocs(q);
                const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                return res.status(200).json(docs);
            }
            
            const relacionesQuery = query(collection(db, 'relacionesAmistad'), where('email_usuarioseguidor', '==', userInfo.id));
            const relacionesSnapshot = await getDocs(relacionesQuery);
            const relaciones = relacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            //mis posts
            const misPostsQuery = query(collection(db, 'contenidos'), where('email_usuario', '==', userInfo.id));
            
            const misPostsSnapshot = await getDocs(misPostsQuery);
            const misPosts = misPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("1");
            const postsPromises = relaciones.map(async (relacion) => {
                console.log("2");
                const postQuery = query(collection(db, 'contenidos'), where('email_usuario', '==', relacion.email_usuarioseguido));
                console.log("3");
                const postSnapshot = await getDocs(postQuery);
                const posts= postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                return posts;
            });

            const postsWithRelaciones = await Promise.all(postsPromises);

            const allPosts = [...misPosts, ...postsWithRelaciones.flat()];

            allPosts.sort((a, b) => new Date(b.fecha_subida) - new Date(a.fecha_subida));
            console.log("4");
            return res.status(200).json(allPosts);

        } catch (error) {
            console.log("misPostsQuery: ");
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los posts' });
        }
    });

    
};



// export const postear = async (req, res) => {
//     const q = 'INSERT INTO contenido (titulo, ruta, id_usuario) VALUES (?, ?, ?)';
//     db.query(q, [req.body.titulo,req.body.ruta, req.body.id_usuario], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Error al postear');
//         } else {
//             console.log('Posteado');
//             res.status(200).send('Posteado');
//         }
//     });
// }