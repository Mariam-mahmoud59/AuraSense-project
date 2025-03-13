import React from 'react'
import "/src/assets/photo_2025-03-08_19-40-05.jpg";




export default function Header() {
  return (
    <div className='bg-[#1A3B6D] w-full h-auto flex md:flex-row flex-col  justify-around flex-nowrap  items-center gap-12 p-10 ' >
      <div className='w-1/2'>
        <h2 className='text-6xl font-extrabold text-white'>See Emotions,<br></br><span className='text-[#FFD01F] font-extrabold text-6xl'>Understand Context</span></h2>
        <p className='text-[#C7CDD5] mt-4'>EmoVision is an advanced AI-powered system that combines emotion recognition and object detection to provide deep contextual understanding of human interactions in real-time.</p>
      </div>
      <div className='w-1/3 '>
      <img src='/src/assets/AKlogo.png' className=''/>
      </div>
    </div>
  )
}
