import { db } from '../connect.js';

export const getUser = (req, res) => {
    const userId = req.query.id_usuario;
    const q = 'SELECT * FROM usuarios WHERE id = ?';

    db.query(q, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...userInfo } = result[0];
        res.json(userInfo);
    });
};

export const getAmigo = (req, res) => {
    const usernombre = req.query.nombre;
    const q = 'SELECT * FROM usuarios WHERE nombre = ?';

    db.query(q, [usernombre], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...userInfo } = result[0];
        res.json(userInfo);
    });
};

export const getAmigos = (req, res) => {

    const q = 'SELECT * FROM usuarios';

    db.query(q, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const { password, ...userInfo } = result;
        res.json(userInfo);
    });
};

export const getUserEstudios = (req, res) => {
    const userId = req.query.id_usuario;
    const q = 'SELECT * FROM estudio WHERE id_usuario = ?';

    db.query(q, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener los estudios del usuario' });
        }

        res.json(result); // Envía todos los resultados de estudios encontrados
    });
};

export const getUserTrabajo = (req, res) => {
    const userId = req.query.id_usuario;
    const q = 'SELECT * FROM trabajo WHERE id_usuario = ?';

    db.query(q, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener el trabajo del usuario' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Trabajo del usuario no encontrado' });
        }

        res.json(result[0]); // Envía el primer resultado de trabajo encontrado
    });
};

export const actualizar = (req, res) => {
    const { id_usuario, nombre, email, fecha_nacimiento, genero, telefono, direccion } = req.body;
    const q = 'UPDATE usuarios SET nombre=?, email = ?, fecha_nacimiento = ?, genero = ?, telefono = ?, direccion = ? WHERE id = ?';

    db.query(q, [nombre, email, fecha_nacimiento, genero, telefono, direccion, id_usuario], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }

        res.json({ message: 'Usuario actualizado' });
    });
};
