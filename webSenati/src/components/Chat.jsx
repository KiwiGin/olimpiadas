import { useEffect, useRef, useState } from "react";
import { w3cwebsocket as Socket } from "websocket";

const client = new Socket("ws://127.0.0.1:8001/");

const Chat = ({ usuarioName }) => {
  const [miMensaje, setMiMensaje] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false); // Estado para manejar si el chat está minimizado
  const messagesEndRef = useRef(null); // Referencia al elemento final de los mensajes

  const scrollToBottom = () => {
    // Hace scroll hacia abajo para enfocar el último mensaje
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSend = () => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "message",
          message: miMensaje,
          usuarioName,
        })
      );
      setMiMensaje("");
    } else {
      console.warn("WebSocket is not open. readyState:", client.readyState);
    }
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("Usuario conectado");
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          usuarioName: data.usuarioName,
        },
      ]);
    };
  }, []);

  useEffect(() => {
    scrollToBottom(); // Llama a la función de scroll después de actualizar los mensajes
  }, [messages]);

  return (
    <>
      {isMinimized && (
        <div className="fixed w-96 bottom-0 right-6" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="w-96 py-2 text-center text-white bg-slate-500 cursor-pointer hover:bg-slate-800">
          Chat: {usuarioName}
        </div>
      </div>
      )
      }
      {!isMinimized && (
        <div className="relative" onClick={() => setIsMinimized(!isMinimized)}>
        <div className="w-full py-2 text-center text-white bg-slate-500 cursor-pointer hover:bg-slate-800">
          Chat: {usuarioName}
        </div>
      </div>
      )
      }
      
      {!isMinimized && (
        <div className="flex flex-col justify-end w-full h-[90vh]">
          <div className="flex flex-col pb-12 overflow-auto">
            {messages.map((message, key) => (
              <div
                key={key}
                className={`w-72 m-10 rounded-lg border pt-5 px-5 pb-4 ${
                  usuarioName === message.usuarioName
                    ? "self-end"
                    : "self-start bg-slate-500"
                }`}
              >
                <section className="flex justify-center items-center flex-wrap mr-7 text-3xl bg-yellow-500 w-12 h-12 float-left rounded-full border">
                  {message.usuarioName[0].toUpperCase()}
                </section>
                <h4 className="mt-0 mb-2.5">{message.usuarioName + ":"}</h4>
                <p className="mt-0 mb-2.5">{message.message}</p>
              </div>
            ))}
            {/* Esta referencia se utiliza para enfocar el último mensaje */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      {!isMinimized && (
        <div className="bottom-0 left-0 w-full flex">
          <input
            className="border border-indigo-500 rounded-lg pl-2.5 pr-3.5 text-lg flex-1"
            type="text"
            value={miMensaje}
            onChange={(e) => setMiMensaje(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && onSend()}
            placeholder="Mensaje"
          />
          <button
            className="rounded-lg text-lg bg-amber-400 text-white px-8 py-2 cursor-pointer font-sans"
            onClick={onSend}
          >
            Enviar
          </button>
        </div>
      )}
    </>
  );
};

export default Chat;
