import React from 'react'
import Share from './Share'
import Posts from './Posts'

function PanelContent() {
  return (
    <>
        <div className='relative min-w-400px max-w-800px h-full bg-green-200 overflow-auto scrollbar-hide'>
          <Share/>
          <Posts/>
          {/* <div className="absolute bottom-4 right-4">
            <button className='rounded-lg text-lg bg-white text-black px-8 py-2 cursor-pointer font-sans'>Post</button>
          </div> */}
        </div>
    </>
  )
}

export default PanelContent