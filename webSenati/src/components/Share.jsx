import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { makeRequest } from "../axios";
import Image from "../assets/img.png";
import CancelIcon from '@mui/icons-material/Cancel';
import PerfilDefault from '../assets/perfil_default.svg';

const Share = () => {
  const [file, setFile] = useState(null);
  //desc es titulo, ya veo si le cambio el nombre o ne
  const [desc, setDesc] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const upload = async () => {
      try {
        setLoading(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (file) upload();
  }, [file]);

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      console.log("file: ", file);
      const tipo = file.type.split("/")[1];
  
      const formData = new FormData();
      formData.append('media', file);
      formData.append('desc', desc);
      formData.append('nombre', currentUser.nombre);
      formData.append('email_usuario', currentUser.email);
  
      await makeRequest.post("/contenidos/addPost", formData);
      setDesc("");
      setFile(null);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="shadow-custom bg-white rounded-3xl m-5">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center grow">

            <img className="w-10 h-10 rounded-full object-cover bg-white" src={PerfilDefault} alt="" />
            {/* <img className="w-10 h-10 rounded-full object-cover" src={"/upload/" + currentUser.profilePic} alt="" /> */}
            <input className="border-none outline-none px-10 py-20 bg-transparent w-3/5 text-gray-700"
              type="text"
              placeholder={`What's on your mind ${currentUser.nombre}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="flex flex-1 justify-end">
            {file && (
              <div className="relative border">
                <img className="w-full h-full object-cover rounded-none" alt="" src={URL.createObjectURL(file)} />
                <div className="absolute w-fit h-fit rounded-full top-0 right-0 cursor-pointer bg-white opacity-0 hover:opacity-100 hover:scale-100 ease-in-out duration-300 delay-75">
                  <CancelIcon className="w-full h-full object-cover" onClick={() => setFile(null)}/>
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="my-5 h-px text-black"/>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="flex items-center gap-2 cursor-pointer">
                <img className="h-5" src={Image} alt="" />
                <span className="text-gray-500 text-xs">Add Image</span>
              </div>
            </label>
          </div>
          <div className="flex flex-1 justify-end">
            <button className="border-none px-5 py-2 text-white cursor-pointer bg-blue-600 rounded-md" onClick={handleClick} disabled={!desc || loading}>
              {loading ? "Loading..." : "Publicar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
