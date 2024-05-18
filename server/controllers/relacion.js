import { db } from '../connect.js';

export const getRelacion = (req, res) => {
    const userId = req.query.id_usuario;
    const q = 'SELECT * FROM relacionesamistad WHERE id_usuario = ?';

    db.query(q, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la relacion del usuario' });
        }

        res.json(result); // Envía todos los resultados de relacion encontrados
    });
};

export const addRelacion = (req, res) => {
    const q = 'INSERT INTO relacionesamistad (id_usuarioseguir, id_usuarioseguido) VALUES (?, ?)';
    console.log(req.body.id_amigo);
    console.log("Yo: "+req.body.id_usuario);

    db.query(q, [req.body.id_usuario, req.body.id_amigo], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al agregar la relacion' });
        }

        res.json({ message: 'Relacion agregada' });
    });
};