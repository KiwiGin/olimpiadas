import React, { useContext, useEffect, useState } from 'react'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GenderIcon from '@mui/icons-material/Man2';
import BadgeIcon from '@mui/icons-material/Badge';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import TodayIcon from '@mui/icons-material/Today';
import EndTimeIcon from '@mui/icons-material/InsertInvitation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';

import Posts from './Posts';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import Modal from './Modal';

function PanelPerfil() {

    // const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("No hay email registrado");
    const [fechaNacimiento, setFechaNacimiento] = useState("No hay");
    const [genero, setGenero] = useState("no hay");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [titulo, setTitulo] = useState("");
    const [institucion, setInstitucion] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [pais, setPais] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [puesto, setPuesto] = useState("");
    const [ciudadTrabajo, setCiudadTrabajo] = useState("");
    const [paisTrabajo, setPaisTrabajo] = useState("");
    const [fechaInicioTrabajo, setFechaInicioTrabajo] = useState("");
    const [fechaFinTrabajo, setFechaFinTrabajo] = useState("");



    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.email)

    // useEffect(() => {
    //     const fetchUserInfo = async () => {
    //         try {
    //             const res = await makeRequest.get(`/usuarios/find?id_usuario=${currentUser.id}`);

    //             const userData = res.data;
    //             // setNombre(userData);
    //             console.log(userData);
    //             setEmail(userData.email);
    //             setFechaNacimiento(userData.fecha_nacimiento);
    //             setGenero(userData.genero);
    //             setTelefono(userData.telefono);
    //             setDireccion(userData.direccion);
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             // setIsLoading(false);
    //         }
    //     };
    //     fetchUserInfo();
    // }, [currentUser.id]);

    // useEffect(() => {
    //     const fetchUserEstudios = async () => {
    //         try {
    //             const res1 = await makeRequest.get(`/usuarios/estudios?id_usuario=${currentUser.id}`);
    //             const userData1 = res1.data;
    //             console.log(res1.data);
    //             if(userData1.length === 0) {
    //                 setTitulo("No hay estudios registrados");
    //                 setInstitucion("No hay estudios registrados");
    //                 setCiudad("No hay estudios registrados");
    //                 setPais("No hay estudios registrados");
    //                 setFechaInicio("No hay estudios registrados");
    //                 setFechaFin("No hay estudios registrados");
    //             }else{
    //                 setTitulo(userData1.titulo);
    //                 setInstitucion(userData1.escuela);
    //                 setCiudad(userData1.ciudad);
    //                 setPais(userData1.pais);
    //                 setFechaInicio(userData1.fecha_inicio);
    //                 setFechaFin(userData1.fecha_fin);

    //             }
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             // setIsLoading(false);
    //         }
    //     };
    //     fetchUserEstudios();
    // }, [currentUser.id]);

    // useEffect(() => {
    //     const fetchUserTrabajo = async () => {
    //         try {
    //             const res2 = await makeRequest.get(`/usuarios/trabajo?id_usuario=${currentUser.id}`);
    //             console.log(res2.data);
    //             const userData2 = res2.data;
    //             if(userData2.length === 0) {
    //                 setEmpresa("No hay trabajos registrados");
    //                 setPuesto("No hay trabajos registrados");
    //                 setCiudadTrabajo("No hay trabajos registrados");
    //                 setPaisTrabajo("No hay trabajos registrados");
    //                 setFechaInicioTrabajo("No hay trabajos registrados");
    //                 setFechaFinTrabajo("No hay trabajos registrados");
    //             }else{
    //                 setEmpresa(userData2.empresa);
    //                 setPuesto(userData2.puesto);
    //                 setCiudadTrabajo(userData2.ciudad);
    //                 setPaisTrabajo(userData2.pais);
    //                 setFechaInicioTrabajo(userData2.fecha_inicio);
    //                 setFechaFinTrabajo(userData2.fecha_fin);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         } finally {
    //             // setIsLoading(false);
    //         }
    //     };
    //     fetchUserTrabajo();
    // }, [currentUser.id]);

      
    
  return (
    <>
        <div className='relative min-w-400px max-w-800px h-full bg-green-200 overflow-auto scrollbar-hide'>
            <div className="w-full h-72 relative">
                <img src="https://images.pexels.com/photos/23709323/pexels-photo-23709323/free-photo-of-moda-hombre-amor-verano.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full h-full object-cover" />
                <img src="https://images.pexels.com/photos/18129477/pexels-photo-18129477/free-photo-of-mujer-pueblo-colina-sentado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-52 h-52 rounded-full object-cover absolute left-0 right-0 m-auto top-44" />
            </div>
            <div className="flex flex-col gap-10 m-5">
                <div className="shadow-custom h-56 bg-slate-50 rounded-3xl p-12 flex flex-row items-center justify-between">
                    <div className="flex flex-1 gap-10 flex-col justify-start">
                        <div className="flex flex-row gap-5">
                            <EmailOutlinedIcon />
                            <span>{email}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <CalendarMonthIcon />
                            <span>{fechaNacimiento}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-5 text-3xl mt-6">
                        <span>{currentUser.nombre}</span>
                        <div className="flex flex-1 items-center justify-end gap-10">
                            <Modal/>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-10">
                        <div className="flex flex-row gap-5">
                            <GenderIcon />
                            <span>{genero}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <SmartphoneIcon />
                            <span>{telefono}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <FmdGoodIcon />
                            <span>{direccion}</span>
                        </div>
                    </div>
                    
                    
                    

                </div>

            </div>
            <div className="flex flex-row gap-10 m-5">
                <div className="shadow-custom h-auto bg-slate-50 rounded-3xl p-5 flex flex-col items-start justify-between w-full">
                    <div className="flex flex-1 flex-row items-center gap-10 text-3xl mt-2 mb-2">
                        <span>Educación</span>
                        <EditIcon />
                    </div>
                    <div className="flex flex-1 gap-2 flex-col">
                        <div className='flex flex-row gap-5'>
                            <SchoolIcon />
                            <span>{titulo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <ApartmentIcon />
                            <span>{institucion}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <LocationCityIcon />
                            <span>{ciudad}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <PublicIcon />
                            <span>{pais}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <TodayIcon />
                            <span>{fechaInicio}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <EndTimeIcon />
                            <span>{fechaFin}</span>
                        </div>
                    </div>
                </div>
                <div className="shadow-custom h-auto bg-slate-50 rounded-3xl p-5 flex flex-col items-start justify-between w-full">
                    <div className="flex flex-1 flex-row items-center gap-10 text-3xl mt-2 mb-2">
                        <span>Trabajo</span>
                        <EditIcon />
                    </div>
                    <div className="flex flex-1 gap-2 flex-col">
                        <div className='flex flex-row gap-5'>
                            <BusinessIcon />
                            <span>{empresa}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <BadgeIcon />
                            <span>{puesto}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <LocationCityIcon />
                            <span>{ciudadTrabajo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <PublicIcon />
                            <span>{paisTrabajo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <TodayIcon />
                            <span>{fechaInicioTrabajo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <EndTimeIcon />
                            <span>{fechaFinTrabajo}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Posts userId={currentUser.email}/>

        </div>
    </>
  )
}

export default PanelPerfil