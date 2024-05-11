import { useState } from "react";
import PropTypes from "prop-types";

const Logeo = ({setUser}) => {
    const [login, setLogin] = useState("")
    return(
        <>
        <div className="flex">
            <input className="border border-indigo-500 rounded-lg pl-2.5 pr-3.5 text-lg flex-1" value={login} onChange={(e) => setLogin(e.target.value)} onKeyUp={(e) => e.key === "Enter" && setUser(login)} type="text" placeholder="enter name" />
            <button className="rounded-lg text-lg bg-amber-400 text-white px-8 py-2 cursor-pointer font-sans" onClick={()=>setUser(login)}>Login</button>
        </div>
        </>
    )
}
Logeo.propTypes = {
    setUser: PropTypes.func.isRequired
};

export default Logeo;