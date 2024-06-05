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
import { useLocation } from 'react-router-dom';
import Posts from './Posts';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import Modal from './Modal';

function PanelPerfil({ userId }) {
    const [finalUserId, setFinalUserId] = useState(null);
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser.email)

    console.log(userId);

    const { isLoading: idLoading, error: idError, data: idData } = useQuery({
        queryKey: ["id", userId],
        queryFn: async () => {
            if (!userId) {
                throw new Error("User ID is undefined");
            }
            const response = await makeRequest.get("/usuarios/findId/", { params: { userId: userId } });
            return response.data;
        },
        enabled: !!userId, // Solo ejecuta la consulta si userId está definido
    });
    console.log({ idData, idError});
    console.log(idData.email);

    // useEffect(() => {
    //     setFinalUserId(idData.email);
    // }, [idData]);

    // console.log(finalUserId);

    const { isLoading: userLoading, error: userError, data: userData } = useQuery({
        queryKey: ["user", idData.email], 
        queryFn: async() => await makeRequest.get("/usuarios/find/", {params: {userId: idData.email}}).then((res) => res.data),
    })

    // console.log(userData);

    const { isLoading: estudiosLoading, error: estudiosError, data: estudiosData } = useQuery({
        queryKey: ["estudios", idData.email], 
        queryFn: async() => await makeRequest.get("/usuarios/estudios/", {params: {userId: idData.email}}).then((res) => res.data),
    })

    // console.log(estudiosData);

    const { isLoading: trabajoLoading, error: trabajoError, data: trabajoData } = useQuery({
        queryKey: ["trabajo", idData.email], 
        queryFn: async() => await makeRequest.get("/usuarios/trabajo/", {params: {userId: idData.email}}).then((res) => res.data),
    })

    // console.log(trabajoData)

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
                            <span>{userData[0].email}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <CalendarMonthIcon />
                            <span>{userData[0].fecha_nacimiento}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-5 text-3xl mt-6">
                        <span>{userData[0].nombre}</span>
                        <div className="flex flex-1 items-center justify-end gap-10">
                            <Modal/>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-10">
                        <div className="flex flex-row gap-5">
                            <GenderIcon />
                            <span>{userData[0].genero}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <SmartphoneIcon />
                            <span>{userData[0].telefono}</span>
                        </div>
                        <div className="flex flex-row gap-5">
                            <FmdGoodIcon />
                            <span>{userData[0].direccion.label}</span>
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
                            <span>{estudiosData[0].titulo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <ApartmentIcon />
                        <span>{estudiosData[0].institucion}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <LocationCityIcon />
                            <span>{estudiosData[0].ciudad}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <PublicIcon />
                            <span>{estudiosData[0].pais}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <TodayIcon />
                            <span>{estudiosData[0].fecha_inicio}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <EndTimeIcon />
                            <span>{estudiosData[0].fecha_fin}</span>
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
                            <span>{trabajoData[0].empresa}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <BadgeIcon />
                            <span>{trabajoData[0].cargo}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <LocationCityIcon />
                            <span>{trabajoData[0].ciudad}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <PublicIcon />
                            <span>{trabajoData[0].pais}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <TodayIcon />
                            <span>{trabajoData[0].fecha_inicio}</span>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <EndTimeIcon />
                            <span>{trabajoData[0].fecha_fin}</span>
                        </div>
                    </div>
                </div>
            </div>
            {console.log("entrada: "+idData.email)}
            <Posts userId={idData.email}/>

        </div>
    </>
  )
}

export default PanelPerfil