import { useState } from 'react'
import { LoginCard } from '../components/LoginCard'
import Logeo from '../components/Logeo'
import Chat from '../components/Chat'

export function Home() {
  const [userName, setUserName] = useState("")
  return (
    <>
      <div className='bg-slate-50' id='wrapper'>
        {userName ? (<Chat usuarioName={userName} />):(<Logeo setUser={setUserName} />)}
      </div>
    </>
  )
}
