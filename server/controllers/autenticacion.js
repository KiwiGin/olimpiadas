import { db } from "../connect.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (req, res) => {  
    //res.send('register');

    //check if user exists
    const query = 'SELECT * FROM usuarios WHERE nombre = ?';

    db.query(query, [req.body.nombre], (err, result) => {
        //console.log(err)
        if (err) {
            return res.status(500).json('Error 1');
        }
        if (result.length) {
            return res.status(409).json('User already exists');
        } 
        //create a new user
            //hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.contraseña, salt);

        const query = "INSERT INTO usuarios (`nombre`, `apellido`, `email`, `contraseña`) VALUES (?)";

        db.query(query, [[req.body.nombre, req.body.apellido, req.body.email, hashedPassword]], (err, result) => {
            if (err) {
                return res.status(500).json('Error 2');
            }
            return res.status(200).json('User created');
        }
        )
    });
}

export const login = (req, res) => {
    const q = "SELECT * FROM usuarios WHERE nombre = ?";
    console.log(req.body.nombre);
    db.query(q, [req.body.nombre], (err, result) => {
        if (err) {
            return res.status(500).json('Error 3');
        }
        console.log(result);
        if (result.length===0) {
            return res.status(404).json('User not found');
        }

        const user = result[0];
        const passwordIsValid = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (!passwordIsValid) {
            return res.status(400).json('Invalid password');
        }
        //return res.status(200).json('Login successful');

        const token = jwt.sign({ id: user.id }, "secretkey");

        const { contraseña, ...others } = user;
        res.cookie('accessToken', token, {
            httpOnly: true,
        }).status(200)
        .json(others);

    });
}

export const logout = (req, res) => {
    res.clearCookie('accessToken', {
        secure: true,
        sameSite: 'none',
    }).status(200).json('Logout successful');

}