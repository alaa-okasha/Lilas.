import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="relative w-full h-screen">
        
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
        ></video>

        
        <div className="relative z-10 flex flex-col items-center justify-center h-full font-poppins text-white space-y-8 sm:space-y-12 lg:space-y-16 px-4 sm:px-8">
          <p className="text-center leading-loose text-sm sm:text-base lg:text-sm">
            Let yourself be seduced by the intoxicating oriental whispers.{" "}
            <br className="hidden sm:block" /> Dive deep, and let your senses be
            captivated.
          </p>
          <p className="font-bold text-base sm:text-lg lg:text-sm">
            Lilas Fragrance – - Smell Good
          </p>
          <Link to="/">
            <button className="bg-white py-2 sm:py-3 lg:py-4 px-6 sm:px-8 lg:px-10 rounded-full text-black text-xs sm:text-sm lg:text-base">
              Shop Now
            </button>
          </Link>
        </div>

        
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="py-8 sm:py-10 lg:py-12 bg-black text-white text-center text-sm sm:text-lg lg:text-xl">
        <p>Every Drop is an Invitation to a World of Exquisite Elegance</p>
      </div>
    </>
  );
}

export default Hero;
