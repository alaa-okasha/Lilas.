import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
        ></video>

        {/* Overlay content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full font-poppins text-sm text-white space-y-16">
          <p className="text-center leading-loose">
            Let yourself be seduced by the intoxicating oriental whispers.{" "}
            <br /> Dive deep, and let your senses be captivated.
          </p>
          <p className="font-bold">Lilas Fragrance – - Smell Good</p>
          <Link to="/">
            <button className="bg-white py-4 px-8 rounded-full text-black">
              Shop Now
            </button>
          </Link>
        </div>

        {/* Optional: Dark overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
      </div>
      <div className="py-12 bg-black text-white text-center text-xl">
        <p>Every Drop is an Invitation to a World of Exquisite Elegance</p>
      </div>
    </>
  );
}

export default Hero;
