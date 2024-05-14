import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';

export function LoginCard() {
    const [nombre, setUsername] = useState('');
    const [contraseña, setPassword] = useState('');
    // const [loggedIn, setLoggedIn] = useState(false);
    // const [isStudent, setIsStudent] = useState(false);
    // const [isTeacher, setIsTeacher] = useState(false);
    const [err, setErr] = useState(null)
    const authContext = useContext(AuthContext);
    console.log("AuthContext value:", authContext); // Check the console for the context value
    const { login } = authContext; // Destructure login function if available

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



        // Perform login logic here
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
        <div className='flex-col p-4 text-center space-y-8 bg-gradient-to-b from-cyan-300 from-80% w-2/5'>
            <h1>INICIO DE SESIÓN</h1>

            <form onSubmit={handleSubmit}>
                <label className='flex flex-col'>
                    Usuario
                    <input type="text" value={nombre} onChange={handleUsernameChange} />
                </label>
                <br />
                <label className='flex flex-col'>
                    Contraseña
                    <input type="password" value={contraseña} onChange={handlePasswordChange} />
                </label>
                <br />
                <a href="#">¿No recuerda su contraseña?</a>
                <br />
                {err && err}
                <button type="submit" className="rounded-full bg-red-500 text-white px-4 py-2">Login</button>
            </form>
        </div>
    );
}
