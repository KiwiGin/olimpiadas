import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export function LoginCard() {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        //setName(username)
        e.preventDefault();
        // Perform login logic here
        console.log('Username:', username);
        console.log('Password:', password);
        // Se validan credenciales
        // Se redirige a la página de inicio
        if (username === 'estudiante' && password === 'contraseña') {
            // Si las credenciales son válidas, establece el estado loggedIn a true
            setLoggedIn(true);
            setIsStudent(true);
        }
        if (username === 'docente' && password === 'contraseña') {
            // Si las credenciales son válidas, establece el estado loggedIn a true
            setLoggedIn(true);
            setIsTeacher(true);
        }
    };

    if (loggedIn) {
        if (isStudent) {
            return <Navigate to="/student" />;
        }
        //if (isTeacher) {
         //   return <Navigate to="/teacher" />;
        //}
    }

    return (
        <div className='flex-col p-4 text-center space-y-8 bg-gradient-to-b from-cyan-300 from-80% w-2/5'>
            <h1>INICIO DE SESIÓN</h1>

            <form onSubmit={handleSubmit}>
                <label className='flex flex-col'>
                    Usuario
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label className='flex flex-col'>
                    Contraseña
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <a href="#">¿No recuerda su contraseña?</a>
                <br />
                <button type="submit" className="rounded-full bg-red-500 text-white px-4 py-2">Login</button>
            </form>
        </div>
    );
}
