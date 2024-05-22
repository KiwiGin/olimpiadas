import React, { useContext, useEffect, useState } from 'react';
import { makeRequest } from '../axios';
import { AuthContext } from "../context/authContext";


function PanelBuscar() {


    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.id)
    let aidi= currentUser.id

    useEffect(() => {
        console.log("cambio el estado")
        mostrarUsuarios()

    }, [busqueda]);

    async function verificarSeguimiento(){
        try {
            console.log("OE: " + aidi)
            let date = await makeRequest.get(`/relacion?id_usuario=${aidi}`);
            const prueba = Object.values(date.data);
            console.log(prueba)
            //setEstadoAmigo(true)
            //setColor("red")
        } catch (error) {
            console.log(error);
        }
    }
    

    async function handleSeguir(idamigo){
        
        console.log('Usuario a seguir:', idamigo);
        
    
        try {
            await makeRequest.post(`/relacion/addRela`, {id_usuario: currentUser.id, id_amigo: idamigo});
            window.location.reload()


        } catch (error) {
            console.log(error);
        }

    }

    async function handleNoSeguir(idamigo){
        console.log('Usuario a dejar de seguir:', idamigo);
        try {
            await makeRequest.post(`/relacion/deleteRela`, {id_usuario: currentUser.id, id_amigo: idamigo});
            window.location.reload()
          
        } catch (error) {
            console.log(error)
        }
    }

    
    const mostrarUsuarios = async() => {
        try {
            const res = await makeRequest.get(`/usuarios/buscarAll`);
            const userData = res.data;
            // Convertir el objeto de usuarios en un array de usuarios
            const usuariosArray = Object.values(userData);
    
            // Obtener las relaciones de seguimiento para el usuario actual
            const resRelaciones = await makeRequest.get(`/relacion?id_usuario=${currentUser.id}`);
            const relaciones = resRelaciones.data;
    
            // Para cada usuario en el array de usuarios, verificar si está siendo seguido por el usuario actual
            const usuariosConRelaciones = usuariosArray.map(usuario => {
                // Verificar si el usuario está siendo seguido por el usuario actual
                const sigue = relaciones.some(relacion => relacion.id_usuarioseguido === usuario.id);
                return { ...usuario, sigue };
            });

            console.log(usuariosConRelaciones)
    
            setResultados(usuariosConRelaciones);
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleInputChange = (e) =>{
        setBusqueda(e.target.value)
    }

    



    const handleBuscar = async() => {
        try {
            const res = await makeRequest.get(`/usuarios/buscar?nombre=${busqueda}`);

            const userData = res.data;
            // Convertir el objeto de usuarios en un array de usuarios
            const usuariosArray = Object.values(userData);
    
            // Obtener las relaciones de seguimiento para el usuario actual
            const resRelaciones = await makeRequest.get(`/relacion?id_usuario=${currentUser.id}`);
            const relaciones = resRelaciones.data;
    
            
            const usuariosConRelaciones = usuariosArray.map(usuario => {
                // Verificar si el usuario está siendo seguido por el usuario actual
                const sigue = relaciones.some(relacion => relacion.id_usuarioseguido === usuario.id);
                return { ...usuario, sigue };
            });

            console.log(usuariosConRelaciones)
    
            setResultados(usuariosConRelaciones);
            
        } catch (err) {
            console.error(err);
        } finally {
            // setIsLoading(false);
        }
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
                            onChange={handleInputChange}
                        />
                        <button
                            className='bg-blue-500 rounded-3xl p-2 px-4 hover:bg-blue-900'
                            onClick={handleBuscar}
                        >
                            Buscar
                        </button>
                    </div>
                    {resultados.length > 0 && (
                        <table className='border-collapse border border-gray-800'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-800 p-2'>id</th>
                                    <th className='border border-gray-800 p-2'>Nombre</th>
                                    <th className='border border-gray-800 p-2'>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map(usuario => (
                                    <tr key={usuario.id}>
                                        
                                        <td className='border border-gray-800 p-2'>{usuario.id}</td>
                                        <td className='border border-gray-800 p-2'>{usuario.nombre}</td>
                                        <td className='border border-gray-800 p-2'>
                                            {!usuario.sigue ? 
                                                (<button onClick={()=>handleSeguir(usuario.id)} className={`bg-blue-500 rounded-3xl p-2 px-4 hover:bg-blue-900`}>Seguir</button>)
                                                :
                                                (<button onClick={()=>handleNoSeguir(usuario.id)} className={`bg-red-500 rounded-3xl p-2 px-4 hover:bg-blue-900`}>Dejar de Seguir</button>)
                                            }
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
