import React from 'react'
import soon from '../assets/soon.webp'

function Modal2() {
  return (
    <div className="py-6 px-44">
      <div className="container w-full flex ">
        <div className="flex flex-col justify-center space-y-3 px-16 w-1/2 font-poppins">
          <p className="text-gray-500">Pumpkin spice tea</p>
          <h1 className="text-4xl">Natural fragrance.</h1>
          <p className="text-gray-500">Winter is coming!</p>
          <button
            className="border border-solid border-black w-1/2 py-2"
            disabled
          >
            Soon.
          </button>
        </div>
        <div className="w-1/2">
          <img src={soon} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Modal2