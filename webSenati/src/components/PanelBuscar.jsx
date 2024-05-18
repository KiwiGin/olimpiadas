import React, { useContext, useEffect, useState } from 'react';
import { makeRequest } from '../axios';
import { AuthContext } from "../context/authContext";


function PanelBuscar() {
    // Supongamos que tienes un array de usuarios
    const [usuarios, setUsuarios] = useState([]);

    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.id)



    const handleBuscar = async() => {
        // Filtrar los usuarios que coinciden con la búsqueda
        try {
            const res = await makeRequest.get(`/usuarios/buscar?nombre=${busqueda}`);

            let userData = res.data;
            // setNombre(userData);
            console.log(userData);
            if (!Array.isArray(userData)) {
                // Intentar convertir userData a una lista
                if (typeof userData === 'object') {
                    userData = [userData];
                } else {
                    // Manejar el caso en el que no se pueda convertir a una lista
                    console.error('La respuesta de la solicitud no es una lista ni un objeto:', userData);
                    setResultados([]);
                    return;
                }
            }
    
            // Actualizar el estado de resultados
            setResultados(userData);
        } catch (err) {
            console.error(err);
        } finally {
            // setIsLoading(false);
        }
        // const resultados = usuarios.filter(usuario =>
        //     usuario.nombre.toLowerCase().includes(busqueda.toLowerCase())
        // );
        // setResultados(resultados);
    };

    return (
        <>
            <div className='relative min-w-400px max-w-800px h-full bg-green-200 overflow-auto scrollbar-hide'>
                <div className='flex flex-col gap-5 p-5'>
                    <h1 className='text-2xl'>Buscar</h1>
                    <div className='flex flex-row gap-5'>
                        <input
                            type="text"
                            placeholder='Buscar'
                            className='border-2 border-gray-300 rounded-md p-1'
                            value={busqueda}
                            onChange={e => setBusqueda(e.target.value)}
                        />
                        <button
                            className='bg-blue-500 rounded-3xl p-2 px-4'
                            onClick={handleBuscar}
                        >
                            Buscar
                        </button>
                    </div>
                    {resultados.length > 0 && (
                        <table className='border-collapse border border-gray-800'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-800 p-2'>Nombre</th>
                                    <th className='border border-gray-800 p-2'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map(usuario => (
                                    <tr key={usuario.id}>
                                        <td className='border border-gray-800 p-2'>{usuario.nombre}</td>
                                        <td className='border border-gray-800 p-2'>
                                            <button className='bg-blue-500 rounded-3xl p-2 px-4'>Seguir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default PanelBuscar;
