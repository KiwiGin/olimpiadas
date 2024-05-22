import { db } from '../connect.js';

export const getRelacion = (req, res) => {
    console.log("Yo pe: "+ req.query.id_usuario);
    const q = 'SELECT * FROM relacionesamistad WHERE id_usuarioseguir = ?';

    db.query(q, [req.query.id_usuario], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error al obtener la relacion del usuario' });
        }

        res.json(result); // Envía todos los resultados de relacion encontrados
    });
};


export const addRelacion = (req, res) => {
    console.log(req.body.id_amigo);
    console.log("Yo: "+req.body.id_usuario);
    //chequear q ya haya relacion
    const query = 'SELECT * FROM relacionesamistad WHERE id_usuarioseguir = ? AND id_usuarioseguido = ?'
    

    db.query(query, [req.body.id_usuario, req.body.id_amigo], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error1 al agregar la relacion' });
        }
        if (result.length) {
            return res.status(409).json('Relation already exists');
        } 

        const q = 'INSERT INTO relacionesamistad (`id_usuarioseguir`, `id_usuarioseguido`) VALUES (?)';
        
        console.log("nivel 2")
        db.query(q, [[req.body.id_usuario, req.body.id_amigo]], (err, resultado) => {
            if (err) {
                console.log("nivel3")
                return res.status(500).json({ message: 'Error2 al agregar la relacion' });
            }
            res.json({ message: 'Relacion agregada' });
        })


    
    });
};

export const deleteRelacion = (req, res) => {
    console.log("Amigo: "+req.body.id_amigo);
    console.log("Yo: "+req.body.id_usuario);
    const q = 'DELETE FROM relacionesamistad WHERE `id_usuarioseguir` = ? AND `id_usuarioseguido` = ?';
        
    console.log("nivel 2")
    db.query(q, [req.body.id_usuario, req.body.id_amigo], (err, resultado) => {
        if (err) {
            console.log("nivel3")
            return res.status(500).json({ message: 'Error2 al borrar la relacion' });
        }
        res.json({ message: 'Relacion borrada' });
    })
}