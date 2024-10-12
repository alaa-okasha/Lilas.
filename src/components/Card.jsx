import React from "react";

function Card({ product,addToCart }) {
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  return (
    <div className="flex flex-col space-y-4 text-gray-500 p-6 font-poppins text-sm">
      <div className="overflow-hidden">
        {/* Display the product image */}
        <img
          src={product.ProductImg}
          alt={product.ProductName}
          className="shadow-md w-full transition-transform duration-300 transform hover:scale-110"
        />
      </div>
      <div className="hover:underline">
        {/* Display the product name */}
        <p>{product.ProductName}</p>
      </div>
      <div>
        {/* Display the product price */}
        <p>LE {product.ProductPrice} EGP</p>
      </div>
      <div>
        {/* Add to Cart button */}
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

// import React from "react";

// function card() {
//   return (
//     <>
//       <div className="flex flex-col space-y-4 text-gray-500 p-6 font-poppins text-sm">
//         <div>
//           <img src="/src/assets/perfume.webp" alt="" className=" shadow-md w-full" />
//         </div>
//         <div>
//           <p>Toasted topacoo & honey</p>
//         </div>
//         <div>
//           <p>LE 1,100.00 EGP</p>
//         </div>
//         <div>
//           <button className=" border-2 border-solid border-black w-full py-2">
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default card;
