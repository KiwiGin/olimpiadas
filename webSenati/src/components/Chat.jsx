import { useEffect, useState } from "react";
import { w3cwebsocket as Socket } from "websocket";

const client = new Socket("ws://127.0.0.1:8000");

const Chat = ({usuarioName}) => {
    const [miMensaje, setMiMensaje] = useState("")
    const [mensajes, setMensajes] = useState([])
    const onSend = () =>{
        client.send(
            JSON.stringify({
                type:"message",
                message: miMensaje,
                usuarioName,
            })
        )
        setMiMensaje("")
    }

    useEffect(()=>{
        client.onopen=()=>{
            console.log("Usuario conectado")
        }
        client.onmessage=(message)=>{
            const data = JSON.parse(message.data)
            setMensajes((mensajes)=>[
                ...mensajes,
                {
                    message:data.message,
                    usuarioName: data.usuarioName
                }
            ])
        };
    }, [])

    return(
        <>
            <div className="bg-slate-500">Chat: {usuarioName}</div>

            <div className="w-72 m-10 rounded-lg border">
                {mensajes.map((message, key)=>(
                    <div key={key} className={`message ${
                        usuarioName === message.usuarioName ? "items-start" : "items-end bg-slate-500"
                    }`}>
                        <section className="flex justify-center items-center flex-wrap mr-7 text-3xl bg-yellow-500 w-12 h-12 float-left rounded-full border">{message.usuarioName[0].toUpperCase()}</section>
                        <h4 className="mt-0 mb-2.5">{message.usuarioName + ":"}</h4>
                        <p className="mt-0 mb-2.5">{message.message}</p>
                    </div>
                ))}
            </div>

            <div>
                <input className="rounded-lg border pl-2.5 pr-3.5 " type="miMensaje" 
                value={miMensaje} 
                onChange={(e)=>setMiMensaje(e.target.value)} 
                onKeyUp={(e) => e.key === "Enter" && onSend()} 
                placeholder="Mensaje" />
                <button className="rounded-lg bg-amber-400" onClick={onSend}>Enviar</button>
            </div>
        </>
    )
}
export default Chat;