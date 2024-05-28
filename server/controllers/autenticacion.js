// import { db } from "../connect.js";
import { db } from "../firebase-config.js";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    //uploadImageAvatar(req.file);

    try {
        // verificar usuario existe por email (email unico)
        const q = query(collection(db, 'usuarios'), where('email', '==', req.body.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return res.status(409).json('User already exists');
        }

        // encriptamos contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.contraseña, salt);

        // creamos nuevo registro en la base de datos de firestore
        await addDoc(collection(db, 'usuarios'), {
            nombre: req.body.nombre,
            email: req.body.email,
            contraseña: hashedPassword,
            fecha_nacimiento: req.body.fecha_nacimiento,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            genero: req.body.genero,
            profile_picture: ""
        });

        await addDoc(collection(db, 'estudios'), {
            email: req.body.email,
            titulo: "",
            institucion: "",
            ciudad: "",
            pais: "",
            fecha_inicio: "",
            fecha_fin: ""
        });

        await addDoc(collection(db, 'trabajos'), {
            email: req.body.email,
            empresa: "",
            cargo: "",
            ciudad: "",
            pais: "",
            fecha_inicio: "",
            fecha_fin: ""
        });


        console.log('Usuario creado');
        return res.status(200).json('User created');
        
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error creating user');
    }
}

export const login = async (req, res) => {
    try {
        // verificamos primero q el email sea correcto
        const q = query(collection(db, 'usuarios'), where('email', '==', req.body.email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return res.status(404).json('User not found');
        }

        // verificar contraseña
        const user = querySnapshot.docs[0].data();
        const passwordIsValid = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (!passwordIsValid) {
            return res.status(400).json('Invalid password');
        }
        console.log('Login successful :');
        console.log(querySnapshot.docs[0].id);

        // generar token
        const token = jwt.sign({ id: user.email }, "secretkey");

        console.log('Token generado: ');
        console.log(token);

        const { contraseña, ...others } = user;

        // enviar token en cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200)
        .json(others);

    } catch (error) {
        console.log(error);
        return res.status(500).json('Error logging in');
    }
}

// export const login = (req, res) => {
//     const q = "SELECT * FROM usuarios WHERE nombre = ?";
//     console.log(req.body.nombre);
//     db.query(q, [req.body.nombre], (err, result) => {
//         if (err) {
//             return res.status(500).json('Error 3');
//         }
//         console.log(result);
//         if (result.length===0) {
//             return res.status(404).json('User not found');
//         }

//         const user = result[0];
//         const passwordIsValid = bcrypt.compareSync(req.body.contraseña, user.contraseña);
//         if (!passwordIsValid) {
//             return res.status(400).json('Invalid password');
//         }
//         //return res.status(200).json('Login successful');

//         const token = jwt.sign({ id: user.id }, "secretkey");

//         const { contraseña, ...others } = user;
//         res.cookie('accessToken', token, {
//             httpOnly: true,
//         }).status(200)
//         .json(others);

//     });
// }

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
    }).status(200).json('Logout successful');

}