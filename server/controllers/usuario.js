import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query, deleteDoc, orderBy } from "firebase/firestore";

export const getUsers = async (req, res) => {
    const nombre_usario = req.body.nombre;
    const q = query(collection(db, 'usuarios'), where('nombre', '==', nombre_usario));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return res.status(404).json('User not found');
    }
    //guardar todos los registros sin la contraseña
    const docs = [];
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { contraseña, ...others } = data;
        docs.push(others);
    });
    res.status(200).json(docs);
};


// export const getUser = (req, res) => {
//     const userId = req.query.id_usuario;
//     const q = 'SELECT * FROM usuarios WHERE id = ?';

//     db.query(q, [userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener el usuario' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         const { password, ...userInfo } = result[0];
//         res.json(userInfo);
//     });
// };

// export const getAmigo = (req, res) => {
//     const usernombre = req.query.nombre;
//     const q = 'SELECT * FROM usuarios WHERE nombre = ?';

//     db.query(q, [usernombre], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener el usuario' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         const { password, ...userInfo } = result[0];
//         res.json(userInfo);
//     });
// };

// export const getAmigos = (req, res) => {

//     const q = 'SELECT * FROM usuarios';

//     db.query(q, (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener el usuario' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         const { password, ...userInfo } = result;
//         res.json(userInfo);
//     });
// };

export const getUserEstudios = async (req, res) => {
    const email_usuario = req.body.email_usuario;
    const q = query(collection(db, 'estudios'), where('email', '==', email_usuario));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return res.status(404).json('User not found');
    }
    // console.log(querySnapshot);
    const docs = querySnapshot.docs[0].data();
    res.status(200).json(docs);
};

// export const getUserEstudios = (req, res) => {
//     const userId = req.query.id_usuario;
//     const q = 'SELECT * FROM estudio WHERE id_usuario = ?';

//     db.query(q, [userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener los estudios del usuario' });
//         }

//         res.json(result); // Envía todos los resultados de estudios encontrados
//     });
// };

export const getUserTrabajo = async (req, res) => {
    const email_usuario = req.body.email_usuario;
    const q = query(collection(db, 'trabajos'), where('email', '==', email_usuario));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return res.status(404).json('User not found');
    }
    // console.log(querySnapshot);
    const docs = querySnapshot.docs[0].data();
    res.status(200).json(docs);
};

// export const getUserTrabajo = (req, res) => {
//     const userId = req.query.id_usuario;
//     const q = 'SELECT * FROM trabajo WHERE id_usuario = ?';

//     db.query(q, [userId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al obtener el trabajo del usuario' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ message: 'Trabajo del usuario no encontrado' });
//         }

//         res.json(result[0]); // Envía el primer resultado de trabajo encontrado
//     });
// };


export const updateUser = async (req, res) => {
    const { nombre, email, fecha_nacimiento, genero, telefono, direccion } = req.body;
    const q = query(collection(db, 'usuarios'), where('id', '==', email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return res.status(404).json('User not found');
    }
    const doc = querySnapshot.docs[0];
    await deleteDoc(doc.ref);
    await addDoc(collection(db, 'usuarios'), {
        nombre: nombre,
        fecha_nacimiento: fecha_nacimiento,
        genero: genero,
        telefono: telefono,
        direccion: direccion
    });
    res.status(200).json({ message: 'Usuario actualizado' });
};

// export const actualizar = (req, res) => {
//     const { id_usuario, nombre, email, fecha_nacimiento, genero, telefono, direccion } = req.body;
//     const q = 'UPDATE usuarios SET nombre=?, email = ?, fecha_nacimiento = ?, genero = ?, telefono = ?, direccion = ? WHERE id = ?';

//     db.query(q, [nombre, email, fecha_nacimiento, genero, telefono, direccion, id_usuario], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error al actualizar el usuario' });
//         }

//         res.json({ message: 'Usuario actualizado' });
//     });
// };
