import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import { BrowserRouter, Route, Routes, Link, useNavigate } from 'react-router-dom';
import PerfilDefault from '../assets/perfil_default.svg';


export default function Sidebar() {
    const authContext = useContext(AuthContext);
    console.log("AuthContext value:", authContext); 
    const { logout } = authContext; 
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await logout()
            navigate('/');
        } catch (err) {
            return err.response.data
        }
    };

  return (
    <>
        <div className='ml-1/5 min-w-60 h-full bg-amber-200 overflow-auto'>
        
            <div className='flex flex-col items-center justify-center h-2/7 mb-10'>
                <Link to="/home">
                    <div className='w-24 h-24 mt-2 flex flex-col items-center justify-center hover:bg-slate-100 rounded-full transition'>
                        <img className='w-20 h-20 rounded-full ' src="/logococo.svg" alt="" />
                    </div>
                </Link>
                <img className='w-24 h-24 mt-5 rounded-full bg-white' src={PerfilDefault} alt='profile'/>
                <h1 className='text-2xl font-bold'>{currentUser.nombre}</h1>
            </div>
            <div className='h-5/7 overflow-auto '>
                <Link to="/home">
                    <div className='flex flex-col items-center justify-center h-16 group/item hover:bg-slate-100 rounded-full transition'>
                        <h1 className='text-2xl font-bold'>Inicio</h1>
                    </div>
                </Link>
                <Link to="/home/buscar">
                    <div className='flex flex-col items-center justify-center h-16 group/item hover:bg-slate-100 rounded-full transition'>
                        <h1 className='text-2xl font-bold'>Buscar</h1>
                    </div>
                </Link>
                <Link to="/home/miperfil">
                    <div className='flex flex-col items-center justify-center h-16 mb-96 group/item hover:bg-slate-100 rounded-full transition'>
                        <h1 className='text-2xl font-bold'>Perfil</h1>
                    </div>
                </Link>
                <div className='flex flex-col items-center justify-center h-16 group/item hover:bg-slate-100 rounded-full cursor-pointer transition' onClick={handleClick}>
                    <h1 className='text-2xl font-bold'>Cerrar Sesión</h1>
                </div>
            </div>
        </div>
    </>
  );
}
