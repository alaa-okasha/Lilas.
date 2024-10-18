import React from 'react'
import soon from '../assets/soon.webp'

function Modal2() {
  return (
    <div className="py-6 px-4 sm:px-8 lg:px-20 xl:px-44">
      <div className="container w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <img src={soon} alt="" className="w-full h-auto" />
        </div>
        <div className="flex flex-col justify-center space-y-3 px-4 sm:px-8 lg:px-16 w-full lg:w-1/2 font-poppins mt-4 lg:mt-0">
          <p className="text-gray-500 text-sm sm:text-base">
            Pumpkin spice tea
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl">
            Natural fragrance.
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Winter is coming!
          </p>
          <button
            className="border border-solid border-black w-full sm:w-1/2 py-2"
            disabled
          >
            Soon.
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal2