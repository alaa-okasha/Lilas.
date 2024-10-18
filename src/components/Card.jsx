import React from "react";

function Card({ product,addToCart }) {
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  return (
    <div className="flex flex-col space-y-4 text-gray-500 p-6 font-poppins text-sm">
      <div className="overflow-hidden">
        
        <img
          src={product.ProductImg}
          alt={product.ProductName}
          className="shadow-md w-full transition-transform duration-300 transform hover:scale-110 rounded-sm"
        />
      </div>
      <div className="hover:underline">
        
        <p>{product.ProductName}</p>
      </div>
      <div>
        
        <p>LE {product.ProductPrice} EGP</p>
      </div>
      <div>
        
        <button
          className="border border-solid border-black w-full py-2 hover:border-2"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Card;

