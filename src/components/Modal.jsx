import React from 'react'
import girl from '../assets/girl.webp';

function Modal() {
  return (
    <div className="py-6 px-44">
      <div className="container w-full flex ">
        <div className="w-1/2">
          <img src={girl} alt="" />
        </div>
        <div className="flex flex-col justify-center space-y-3 px-16 w-1/2 font-poppins">
          <p className='text-gray-500'>Luxurious picks</p>
          <h1 className='text-4xl'>Toasted tobacco and honey</h1>
          <p className='text-gray-500'>VIP!</p>
          <button className='border border-solid border-black hover:border-2 w-1/2 py-2'>View</button>
        </div>
      </div>
    </div>
  );
}

export default Modal