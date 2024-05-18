import { db } from '../connect.js';

export const getContenidos = async (req, res) => {
    // const token = req.cookies.accessToken;
    // if(!token) return res.status(401).json('No hay token');

    // jwt.verify(token, 'secretkey', (err, userInfo) => {
    //     if(err) return res.status(403).json('Token no válido');
    // });
    const {userId} = req.query;

    if(userId) {
        const q = 'SELECT c.id, c.ruta, u.id as userid, titulo, u.nombre as usernombre, u.profilePic as profilePic, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id WHERE c.id_usuario='+ userId +' ORDER BY c.fecha_subida DESC';
        db.query(q, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los contenidos');
            } else {
                res.status(200).send(result);
            }
        });
    }else{
        const q = 'SELECT c.id, c.ruta, u.id as userid, titulo, u.nombre as usernombre, u.profilePic as profilePic, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id ORDER BY c.fecha_subida DESC';
        db.query(q, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los contenidos');
            } else {
                res.status(200).send(result);
            }
        });
    }


    

    // const q = 'SELECT c.id, u.id as userid, titulo, u.nombre as usernombre, fecha_subida FROM contenido AS c JOIN usuarios AS u ON c.id_usuario = u.id LEFT JOIN relacionesamistad AS r ON c.id_usuario = r.id_usuarioseguido WHERE r.id_usuarioseguir=? OR c.id_usuario=? ORDER BY c.fecha_subida DESC';
    // db.query(q, [userInfo.id], [userInfo.id], (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('Error al obtener los contenidos');
    //     } else {
    //         res.status(200).send(result);
    //     }
    // });
}


export const postear = async (req, res) => {
    const q = 'INSERT INTO contenido (titulo, ruta, id_usuario) VALUES (?, ?, ?)';
    db.query(q, [req.body.titulo,req.body.ruta, req.body.id_usuario], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al postear');
        } else {
            console.log('Posteado');
            res.status(200).send('Posteado');
        }
    });
}