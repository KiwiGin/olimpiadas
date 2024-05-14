import { useEffect, useState } from "react";
import { w3cwebsocket as Socket } from "websocket";

const client = new Socket("ws://bdrll2l3-8001.brs.devtunnels.ms/");

const Chat = ({usuarioName}) => {
    const [miMensaje, setMiMensaje] = useState("")
    const [messages, setMessages] = useState([])
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
            setMessages((messages)=>[
                ...messages,
                {
                    message:data.message,
                    usuarioName: data.usuarioName
                }
            ])
        };
    }, [])

    return(
        <>
            <div className="relative">
                <div className="w-full py-2 text-center text-white bg-slate-500">Chat: {usuarioName}</div>
            </div>
        <div className="flex flex-col justify-end w-full h-[90vh]">
            <div className="flex flex-col pb-12 overflow-auto">
                {messages.map((message, key)=>(
                    <div key={key} className={`w-72 m-10 rounded-lg border pt-5 px-5 pb-4 ${
                        console.log("Otros:"+message.usuarioName),
                        console.log("Yo: "+usuarioName),
                        usuarioName === message.usuarioName ? "self-end" : "self-start bg-slate-500"
                    }`}>
                        <section className="flex justify-center items-center flex-wrap mr-7 text-3xl bg-yellow-500 w-12 h-12 float-left rounded-full border">{message.usuarioName[0].toUpperCase()}</section>
                        <h4 className="mt-0 mb-2.5">{message.usuarioName + ":"}</h4>
                        <p className="mt-0 mb-2.5">{message.message}</p>
                    </div>
                ))}
            </div>

        </div>
            <div className="bottom-0 left-0 w-full flex">
                <input className="border border-indigo-500 rounded-lg pl-2.5 pr-3.5 text-lg flex-1" type="miMensaje" 
                value={miMensaje} 
                onChange={(e)=>setMiMensaje(e.target.value)} 
                onKeyUp={(e) => e.key === "Enter" && onSend()} 
                placeholder="Mensaje" />
                <button className="rounded-lg text-lg bg-amber-400 text-white px-8 py-2 cursor-pointer font-sans" onClick={onSend}>Enviar</button>
            </div>
        </>
    )
}
export default Chat;