import { useState } from "react";

const Logeo = ({setUser}) => {
    const [login, setLogin] = useState("")
    return(
        <>
        <div>
            <input value={login} onChange={(e) => setLogin(e.target.value)} onKeyUp={(e) => e.key === "Enter" && setUser(login)} type="text" placeholder="enter name" />
            <button onClick={()=>setUser(login)}>Login</button>
        </div>
        </>
    )
}

export default Logeo;