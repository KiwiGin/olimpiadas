import { useState } from 'react'
// import { LoginCard } from '../components/LoginCard'
// import Logeo from '../components/Logeo'
import { useLocation } from 'react-router-dom';
import Chat from '../components/Chat'

export function Home() {
  // const [userName, setUserName] = useState("")
  const location = useLocation();
  const usuarioFromLocation = location.state && location.state.usuario;
  const [usuario, setUsuario] = useState(usuarioFromLocation);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [mensajePost, setMensajePost] = useState('');
  const [mensajes, setMensajes] = useState([]);

  const handlePostClick = () => {
    setMostrarTarjeta(true);
  };

  const handleEnviarPost = () => {
    // Aquí puedes enviar el mensaje del post al servidor o realizar cualquier otra acción necesaria
    console.log('Mensaje del post:', mensajePost);
    // Agregar el mensaje del post a la lista de mensajes
    setMensajes([...mensajes, mensajePost]);
    // Cerrar la tarjeta después de enviar el post
    setMostrarTarjeta(false);
    // Limpiar el estado del mensaje del post
    setMensajePost('');
  };
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='relative w-9/12 h-full bg-green-200'>
          <div className="absolute bottom-4 right-4">
            <button onClick={handlePostClick} className='rounded-lg text-lg bg-white text-black px-8 py-2 cursor-pointer font-sans'>Post</button>
          </div>

          <div className="top-0 left-0 right-0 bottom-0 overflow-y-auto p-4">
            {mensajes.map((mensaje, index) => (
              <div key={index} className="mb-4">{mensaje}</div>
            ))}
          </div>
          
        </div>
        <div className='h-full flex-grow' id='wrapper'>
          <Chat usuarioName={usuario} />
        </div>
      </div>
      {mostrarTarjeta && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <textarea 
              value={mensajePost} 
              onChange={(e) => setMensajePost(e.target.value)} 
              placeholder="Escribe tu mensaje aquí" 
              className="w-full h-32 border border-gray-300 rounded-lg p-2 mb-4"
            />
            <button onClick={handleEnviarPost} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Postear ahora!</button>
            <button onClick={() => setMostrarTarjeta(false)} className="bg-red-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
          </div>
        </div>
      )}
    </>
  );
}


