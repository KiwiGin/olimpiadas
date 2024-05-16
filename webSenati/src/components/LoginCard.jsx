import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import coco from '../assets/coco1.jfif'

export function LoginCard() {
    const [nombre, setUsername] = useState('');
    const [contraseña, setPassword] = useState('');
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [isStudent, setIsStudent] = useState(false);
    // const [isTeacher, setIsTeacher] = useState(false);
    const [err, setErr] = useState(null)
    const authContext = useContext(AuthContext);
    console.log("AuthContext value:", authContext); 
    const { login } = authContext; 
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        //setName(username)
        e.preventDefault();

        try {
            await login({ nombre, contraseña })
            navigate('/home', { state: { usuario: nombre } });
        } catch (err) {
            setErr(err.response.data)
        }



        
        console.log('Username:', nombre);
        console.log('Password:', contraseña);
        // Se validan credenciales
        // Se redirige a la página de inicio
        // if (username === 'estudiante' && password === 'contraseña') {
        //     // Si las credenciales son válidas, establece el estado loggedIn a true
        //     setLoggedIn(true);
        //     setIsStudent(true);
        // }
        // if (username === 'docente' && password === 'contraseña') {
        //     // Si las credenciales son válidas, establece el estado loggedIn a true
        //     setLoggedIn(true);
        //     setIsTeacher(true);
        // }
    };

    // if (loggedIn) {
    //     if (isStudent) {
    //         return <Navigate to="/home" state={{ usuario: username }} />;

    //     }
    //     if (isTeacher) {
    //         return <Navigate to="/home" state={{ usuario: username }} />;
    //     }
    // }

    return (
        <>

        <div className='flex flex-row items-center justify-center w-full h-full mx-96'>

            <div className='flex flex-row text-center bg-gradient-to-b from-yellow-200 from-5% to-green-600 rounded-3xl w-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col items-center justify-center mt-5 w-full'>
                        <div className='w-20 mt-5'>
                            <img className='object-cover' src="/logococo.svg" alt="" />
                        </div>

                        <h1>INICIO DE SESIÓN</h1>
                        <br/><br />
                        <form onSubmit={handleSubmit}>
                            <label className='flex flex-col'>
                                Usuario
                                <input className='rounded-3xl px-4 py-2' type="text" value={nombre} onChange={handleUsernameChange} />
                            </label>
                            <br />
                            <label className='flex flex-col'>
                                Contraseña
                                <input className='rounded-3xl px-4 py-2' type="password" value={contraseña} onChange={handlePasswordChange} />
                            </label>
                            <br />
                            <a href="#">¿No recuerda su contraseña?</a>
                            <br />
                            {err && err}
                            <button type="submit" className="rounded-full bg-red-500 text-white px-4 py-2 w-full">Login</button>
                        </form>
                    </div>

                </div>
                <div className='my-5'>
                    <img src={coco} alt="Image" className="rounded-3xl object-cover relative top-[-2px] right-[-40px]" />
                </div>

                
            </div>
        </div>
        </>
    );
}
