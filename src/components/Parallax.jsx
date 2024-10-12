import React from 'react';
import backgroundImage from '../assets/p.jpg';

function Parallax() {
  return (
    <>
      <div
        className="bg-fixed bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </>
  );
}

export default Parallax