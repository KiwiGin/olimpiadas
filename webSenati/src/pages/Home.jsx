import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat'
import Posts from '../components/Posts';
import Share from '../components/Share';
import PanelContent from '../components/PanelContent';
import Sidebar from '../components/Sidebar';
import SidebarDerecho from '../components/SidebarDerecho';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PanelPerfil from '../components/PanelPerfil';
import PanelBuscar from '../components/PanelBuscar';
import { AuthContext } from "../context/authContext";

export function Home() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className='flex w-full h-screen flex-row justify-center'>
        <Sidebar/>
          <Routes>
            <Route path="/" element={<PanelContent />} />
            <Route path="buscar" element={<PanelBuscar />} />
            <Route path="miperfil" element={<PanelPerfil />} />
          </Routes>
        <SidebarDerecho/>

        <div className='absolute bg-white right-6 w-96' id='wrapper'>
          <Chat usuarioName={currentUser.nombre} />
        </div>

      </div>
    </>
  );
}

