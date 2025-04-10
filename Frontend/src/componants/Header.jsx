import React from 'react'
import '/src/assets/photo.avif';




export default function Header() {
  return (<>
    <div className='bg-[#1A3B6D] w-full h-auto flex md:flex-row flex-col  justify-around flex-nowrap  items-center gap-12 p-10 ' >
      <div className='w-1/2'>
        

 
        <h2 className='text-6xl font-extrabold text-white'>See Emotions,<br></br><span className='text-[#2bcdc8d2] font-extrabold text-6xl'>Understand Context</span></h2>
        <p className='m-2 text-2xl text-[#C7CDD5] mt-5'>EmoVision is an advanced AI-powered system that combines emotion recognition and object detection to provide deep contextual understanding of human interactions in real-time.</p>
<button type="button" className="text-white bg-gradient-to-br  from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dry Demo  
  
</button>
<button type="button" className="text-gray-900 bg-gradient-to-r m-10 from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Learn More</button>
  </div>
      <div className='w-1/2 '>
      <img src='/src/assets/photo.avif' className=''/>
      </div>
    </div>
      
<div>
  

</div>

    </>
  )
}
