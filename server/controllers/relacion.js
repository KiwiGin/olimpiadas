import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc } from "firebase/firestore";

export const getRelation = async (req, res) => {
    console.log("Yo pe: "+ req.body.email_usuario);

    try {
        const q = query(collection(db, 'relacionesAmistad'), where('email_usuarioseguidor', '==', req.body.email_usuario));
    
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
            docs.push(doc.data());
        });
        res.status(200).json(docs);
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la relacion del usuario' });
    }
};

// export const getRelacion = (req, res) => {
//     console.log("Yo pe: "+ req.query.id_usuario);
//     const q = 'SELECT * FROM relacionesamistad WHERE id_usuarioseguir = ?';

//     db.query(q, [req.query.id_usuario], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener la relacion del usuario' });
//         }

//         res.json(result); // Envía todos los resultados de relacion encontrados
//     });
// };

export const addRelation = async (req, res) => {
    console.log("Amigo: "+req.body.email_nuevoAmigo);
    console.log("Yo: "+req.body.email_usuario);
    //chequear q ya haya relacion

    try {
        await addDoc(collection(db, 'relacionesAmistad'), {
            email_usuarioseguidor: req.body.email_usuario,
            email_usuarioseguido: req.body.email_nuevoAmigo
        });
    
        res.status(200).json({ message: 'Relacion agregada' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la relacion' });
    }
};
// export const addRelacion = (req, res) => {
//     console.log(req.body.id_amigo);
//     console.log("Yo: "+req.body.id_usuario);
//     //chequear q ya haya relacion
//     const query = 'SELECT * FROM relacionesamistad WHERE id_usuarioseguir = ? AND id_usuarioseguido = ?'
    

//     db.query(query, [req.body.id_usuario, req.body.id_amigo], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error1 al agregar la relacion' });
//         }
//         if (result.length) {
//             return res.status(409).json('Relation already exists');
//         } 

//         const q = 'INSERT INTO relacionesamistad (`id_usuarioseguir`, `id_usuarioseguido`) VALUES (?)';
        
//         console.log("nivel 2")
//         db.query(q, [[req.body.id_usuario, req.body.id_amigo]], (err, resultado) => {
//             if (err) {
//                 console.log("nivel3")
//                 return res.status(500).json({ message: 'Error2 al agregar la relacion' });
//             }
//             res.json({ message: 'Relacion agregada' });
//         })


    
//     });
// };


export const deleteRelation = async (req, res) => {
    console.log("Amigo: "+req.body.email_amigo);
    console.log("Yo: "+req.body.email_usuario);
    try {
        const q = query(collection(db, 'relacionesAmistad'), where('email_usuarioseguidor', '==', req.body.email_usuario), where('email_usuarioseguido', '==', req.body.email_amigo));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        res.status(200).json({ message: 'Relacion borrada' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al borrar la relacion' });
    }
}
// export const deleteRelacion = (req, res) => {
//     console.log("Amigo: "+req.body.id_amigo);
//     console.log("Yo: "+req.body.id_usuario);
//     const q = 'DELETE FROM relacionesamistad WHERE `id_usuarioseguir` = ? AND `id_usuarioseguido` = ?';
        
//     console.log("nivel 2")
//     db.query(q, [req.body.id_usuario, req.body.id_amigo], (err, resultado) => {
//         if (err) {
//             console.log("nivel3")
//             return res.status(500).json({ message: 'Error2 al borrar la relacion' });
//         }
//         res.json({ message: 'Relacion borrada' });
//     })
// }