import { useState } from 'react'
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

export function Home() {
  const location = useLocation();
  const usuarioFromLocation = location.state && location.state.usuario;
  const [usuario, setUsuario] = useState(usuarioFromLocation);

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

        {/* <div className='h-full flex-grow' id='wrapper'>
          <Chat usuarioName={usuario} />
        </div> */}

      </div>
    </>
  );
}

