import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { motion } from 'framer-motion';
import coco from '../assets/coco1.jfif';

export function LoginCard() {
    const [nombre, setUsername] = useState('');
    const [contraseña, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const authContext = useContext(AuthContext);
    const { login, register } = authContext;
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await register({ nombre, email, contraseña, confirmPassword });
                navigate('/home', { state: { usuario: nombre } });
            } else {
                await login({ nombre, contraseña });
                navigate('/home', { state: { usuario: nombre } });
            }
        } catch (err) {
            setErr(err.response.data);
        }
    };

    const toggleForm = () => {
        setIsRegistering(!isRegistering);
        setErr(null);
    };

    return (
        <div className='flex flex-row items-center justify-center w-full h-full mx-96'>
            <div className='flex flex-row text-center bg-gradient-to-b from-yellow-200 from-5% to-green-600 rounded-3xl w-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex flex-col items-center justify-center m-6 w-full'>
                        <div className='w-20 mt-5'>
                            <img className='object-cover' src="/logococo.svg" alt="" />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1>{isRegistering ? 'REGISTRO' : 'INICIO DE SESIÓN'}</h1>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                {isRegistering && (
                                    <label className='flex flex-col'>
                                        Email
                                        <input className='rounded-3xl px-4 py-2' type="email" value={email} onChange={handleEmailChange} />
                                    </label>
                                )}
                                <br />
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
                                {isRegistering && (
                                    <label className='flex flex-col'>
                                        Confirmar Contraseña
                                        <input className='rounded-3xl px-4 py-2' type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                                    </label>
                                )}
                                <br />
                                {!isRegistering && (
                                    <a href="#" className='text-slate-700 hover:text-white transition'>¿No recuerda su contraseña?</a>
                                )}
                                <br />
                                <br />
                                {err && <div className='text-red-500'>{err}</div>}
                                <button type="submit" className="rounded-full bg-red-500 text-white px-4 py-2 w-full hover:bg-red-800 transition">
                                    {isRegistering ? 'Registrar' : 'Login'}
                                </button>
                                <div className='text-slate-700'>
                                    <a href="#" onClick={toggleForm} className='hover:text-white transition'>
                                        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                                    </a>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
                <div className='my-5'>
                    <img src={coco} alt="Image" className="rounded-3xl object-cover relative top-[-2px] right-[-40px]" />
                </div>
            </div>
        </div>
    );
}
