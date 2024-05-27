import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";
import jwt from 'jsonwebtoken';

export const getPosts = async (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json('No hay token');

    jwt.verify(token, "secretkey", async (err, userInfo) => {
        if(err) return res.status(403).json('Token no válido');
        console.log("UserInfo:");
        console.log(userInfo.id);
        try {
            const relacionesQuery = query(collection(db, 'relacionesAmistad'), where('email_usuarioseguidor', '==', userInfo.id));
            const relacionesSnapshot = await getDocs(relacionesQuery);
            const relaciones = relacionesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            //mis posts
            const misPostsQuery = query(collection(db, 'contenidos'), where('email_usuario', '==', userInfo.id));
            const misPostsSnapshot = await getDocs(misPostsQuery);
            const misPosts = misPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            const postsPromises = relaciones.map(async (relacion) => {
                const postQuery = query(collection(db, 'contenidos'), where('email_usuario', '==', relacion.email_usuarioseguido));
                const postSnapshot = await getDocs(postQuery);
                const posts= postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                return posts;
            });

            const postsWithRelaciones = await Promise.all(postsPromises);

            const allPosts = [...misPosts, ...postsWithRelaciones.flat()];

            allPosts.sort((a, b) => new Date(b.fecha_subida) - new Date(a.fecha_subida));

            return res.status(200).json(allPosts);

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los posts' });
        }
    });

    
};
// export const getContenidos = async (req, res) => {
//     // const token = req.cookies.accessToken;
//     // if(!token) return res.status(401).json('No hay token');

//     // jwt.verify(token, 'secretkey', (err, userInfo) => {
//     //     if(err) return res.status(403).json('Token no válido');
//     // });
//     const {userId} = req.query;

//     if(userId) {
//         const q = 'SELECT c.id, c.ruta, u.id as userid, titulo, u.nombre as usernombre, u.profilePic as profilePic, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id WHERE c.id_usuario=? ORDER BY c.fecha_subida DESC';
//         db.query(q, [userId], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Error al obtener los contenidos');
//             } else {
//                 res.status(200).send(result);
//             }
//         });
//     }else{
//         const q = 'SELECT c.id, c.ruta, u.id as userid, titulo, u.nombre as usernombre, u.profilePic as profilePic, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id ORDER BY c.fecha_subida DESC';
//         db.query(q, (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Error al obtener los contenidos');
//             } else {
//                 res.status(200).send(result);
//             }
//         });
//     }


    

//     // const q = 'SELECT c.id, u.id as userid, titulo, u.nombre as usernombre, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id LEFT JOIN relacionesamistad AS r ON c.id_usuario = r.id_usuarioseguido WHERE r.id_usuarioseguir=? OR c.id_usuario=? ORDER BY c.fecha_subida DESC';
//     // db.query(q, [userInfo.id], [userInfo.id], (err, result) => {
//     //     if (err) {
//     //         console.log(err);
//     //         res.status(500).send('Error al obtener los contenidos');
//     //     } else {
//     //         res.status(200).send(result);
//     //     }
//     // });
// }

export const addPost = async (req, res) => {
    try {
        const date = new Date();
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date - offset).toISOString().slice(0, -1);
        await addDoc(collection(db, 'contenidos'), {
            email_usuario: req.body.email_usuario,
            nombre_usario: req.body.nombre,
            descripcion: req.body.desc,
            media: req.body.media,
            fecha_subida: localISOTime
        });
    
        res.status(200).json({ message: 'Posteado' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al postear' });
    }
}

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