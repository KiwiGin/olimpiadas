import { useState } from 'react'
// import { LoginCard } from '../components/LoginCard'
// import Logeo from '../components/Logeo'
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat'
import Posts from '../components/Posts';

export function Home() {
  // const [userName, setUserName] = useState("")
  const location = useLocation();
  const usuarioFromLocation = location.state && location.state.usuario;
  const [usuario, setUsuario] = useState(usuarioFromLocation);

  return (
    <>
      <div className='flex w-full h-screen'>

        <div className='relative w-9/12 h-full bg-green-200'>
          <div className="absolute bottom-4 right-4">
            <button className='rounded-lg text-lg bg-white text-black px-8 py-2 cursor-pointer font-sans'>Post</button>
          </div>
        </div>

        <div className='h-full flex-grow' id='wrapper'>
          <Chat usuarioName={usuario} />
        </div>

        <Posts/>

      </div>


      
    </>
  );
}


