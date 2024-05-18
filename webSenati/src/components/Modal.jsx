import React, { useContext, useEffect, useState } from 'react'
import { makeRequest } from '../axios';
import { AuthContext } from "../context/authContext";

function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [nombre, setNombre] = useState('');

    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await makeRequest.get(`/usuarios/find?id_usuario=${currentUser.id}`);

                const userData = res.data;
                console.log(userData);
                setNombre(userData.nombre);
                setEmail(userData.email);
                setFechaNacimiento(userData.fecha_nacimiento);
                setGenero(userData.genero);
                setTelefono(userData.telefono);
                setDireccion(userData.direccion);
            } catch (err) {
                console.error(err);
            } finally {
                // setIsLoading(false);
            }
        };
        fetchUserInfo();
    }, [currentUser.id]);


    const handleClick = async() => {
        try {
            const res = await makeRequest.post(`/usuarios/actualizar`, {id_usuario: currentUser.id, nombre, email, fecha_nacimiento: fechaNacimiento, genero, telefono, direccion});

            const userData = res.data;
            console.log(userData);
            handleClose();
            window.location.reload();

        } catch (err) {
            console.error(err);
        } finally {
            // setIsLoading(false);
        }
        

    }

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleFechaNacimientoChange = (e) => {
        setFechaNacimiento(e.target.value);
    }
    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    }
    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    }
    const handleDireccionChange = (e) => {
        setDireccion(e.target.value);
    }


    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
  return (
    <>
        <button className='bg-red-500 rounded-3xl p-2 px-4 text-xl' onClick={handleOpen}>Editar</button>
        {
            isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center text-xs'>
                    <div className='bg-white min-w-200px max-h-96 p-10 rounded flex flex-col justify-center items-center gap-5 overflow-auto'>
                        <div className='flex flex-col'>
                            <h1 className='text-2xl'>Editar Perfil</h1>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="profile-pic" className='text-lg'>Foto de Perfil</label>
                                <input type="file" id="profile-pic" className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="header-pic" className='text-lg'>Portada</label>
                                <input type="file" id="header-pic" className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="name" className='text-lg'>Nombre</label>
                                <input type="text" id="name" value={nombre} onChange={handleNombreChange} className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="email" className='text-lg'>Email</label>
                                <input type="email" id="email" value={email} onChange={handleEmailChange} className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="date">Cumpleaños</label>
                                <input type="date" id="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="gender" className='text-lg'>Género</label>
                                <input type="text" value={genero} onChange={handleGeneroChange} className='border-2 border-gray-300 rounded-md p-1' />
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="phone" className='text-lg'>Teléfono</label>
                                <input type="tel" id="phone" value={telefono} onChange={handleTelefonoChange} className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <label htmlFor="address" className='text-lg'>Dirección</label>
                                <input type="text" id="address" value={direccion} onChange={handleDireccionChange} className='border-2 border-gray-300 rounded-md p-1'/>
                            </div>
                        </div>
                        
                        <div className='flex flex-row gap-5'>
                            <div>
                                <button className='bg-green-500 rounded-3xl p-2 px-4' onClick={handleClick}>Guardar</button>
                            </div>
                            <div>
                                <button className='bg-red-500 rounded-3xl p-2 px-4' onClick={handleClose}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    </>
  )
}

export default Modal