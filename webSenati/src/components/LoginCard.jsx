import { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { makeRequest } from '../axios';
import { motion } from 'framer-motion';
import coco from '../assets/coco1.jfif';
import Select from 'react-select'
import countryList from 'react-select-country-list'

export function LoginCard() {
    const [isClearable, setIsClearable] = useState(true);
    const [isSearchable, setIsSearchable] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRtl, setIsRtl] = useState(false);

    const [nombre, setUsername] = useState('');
    const [contraseña, setPassword] = useState('');
    const [err, setErr] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [fecha, setFecha] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [pais, setPais] = useState(null);

    const options = useMemo(() => countryList().getData(), [])

    
    const authContext = useContext(AuthContext);
    const { login } = authContext;
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
    
    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const handleGeneroChange = (e) => {
        setGenero(e.target.value);
    };

    const handleTelefonoChange = (e) => {
        setTelefono(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isRegistering) {
                await makeRequest.post('/autenticacion/register', { "nombre": nombre,"contraseña": contraseña,"email": email,"fecha_nacimiento": fecha,"genero": genero,"telefono": telefono,"direccion": pais});

                window.location.reload()
            } else {
                await login({ email, contraseña });
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
                                <div>
                                    
                                    <label className='flex flex-col'>
                                        Email
                                        <input className='rounded-3xl px-4 py-2' type="email" value={email} onChange={handleEmailChange} />
                                    </label>
                                    
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
                                </div>
                                {isRegistering && (
                                    <div className='flex'>
                                        <label className='flex flex-col'>
                                            Fecha de Nacimiento
                                            <input className='rounded-3xl px-4 py-2' type="date" value={fecha} onChange={handleFechaChange} />
                                        </label>
                                        <label className='flex flex-col'>
                                            Género
                                            <select className='rounded-3xl px-4 py-2' value={genero} onChange={handleGeneroChange}>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                                <option value="No Binario">No binario</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                        </label>
                                        <label className='flex flex-col'>
                                            Teléfono
                                            <input className='rounded-3xl px-4 py-2 w-32' type="tel" value={telefono} onChange={handleTelefonoChange} />
                                        </label>
                                        <label className='flex flex-col'>
                                            País
                                            <Select
                                            styles={
                                                {
                                                    control: (styles) => ({ ...styles, backgroundColor: 'white', width: '200px', height: '40px', borderRadius: '20px' }),
                                                    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
                                                        return {
                                                            ...styles,
                                                            backgroundColor: isDisabled
                                                                ? null
                                                                : isSelected
                                                                    ? '#FFFB6C'
                                                                    : isFocused
                                                                        ? '#FFFB6C'
                                                                        : null,
                                                            color: isDisabled
                                                                ? '#ccc'
                                                                : isSelected
                                                                    ? 'black'
                                                                    : '#333',
                                                            cursor: isDisabled ? 'not-allowed' : 'default',
                                                        };
                                                    },
                                                }
                                            } 
                                            classNamePrefix="select"
                                            isDisabled={isDisabled}
                                            isLoading={isLoading}
                                            isClearable={isClearable}
                                            isRtl={isRtl}
                                            isSearchable={isSearchable} 
                                            options={options}
                                            onChange={setPais}
                                            />
                                        </label>
                                    </div>
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
