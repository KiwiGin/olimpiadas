import { db } from '../connect.js';

export const getContenidos = async (req, res) => {
    const q = 'SELECT c.*, u.id, titulo FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id';
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los contenidos');
        } else {
            res.status(200).send(result);
        }
    });
}