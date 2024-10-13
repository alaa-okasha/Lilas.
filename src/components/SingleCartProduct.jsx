import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { auth, db } from "../config/Confij.jsx";
import { doc, getDoc, setDoc, updateDoc,deleteDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function SingleCartProduct({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
  cartProductDelete,
}) {
  const handelCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handelCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };
  const handelCartProductDelete = () => {
    cartProductDelete(cartProduct);
  };
  return (
    <>
      <tr className="font-poppins text-sm text-gray-500">
        <td className="flex flex-row lg:justify-between lg:space-x-4 space-y-4 lg:space-y-0 pt-16">
          {/* Product Info */}
          <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 w-1/3 lg:w-1/6">
            <img
              className="w-24 h-24 lg:w-32 lg:h-32 border-2 border-solid border-gray-200"
              src={cartProduct.ProductImg}
              alt=""
            />
            <div className="flex flex-col space-y-3">
              <span className="text-left">
                {cartProduct.ProductName}
              </span>
              <span className="text-left">{`LE ${cartProduct.ProductPrice}`}</span>
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex flex-row sm:items-start ml-12 space-x-4 lg:w-1/6 w-2/3">
            <div className="flex justify-evenly items-center border-2 border-gray-300 py-2 lg:py-3 h-12 lg:h-1/3 w-full lg:w-3/4">
              <button
                className={`font-bold py-2 px-2 rounded ${
                  cartProduct.qty === 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-red-800 hover:text-white"
                }`}
                onClick={handelCartProductDecrease}
                disabled={cartProduct.qty === 1}
              >
                -
              </button>
              <span>{cartProduct.qty}</span>
              <button
                onClick={handelCartProductIncrease}
                className="font-bold py-2 px-2 rounded hover:bg-green-800 hover:text-white"
              >
                +
              </button>
            </div>
            <button className="text-red-700 flex flex-col items-center pt-4" onClick={handelCartProductDelete}>
              <FaTrashAlt />
            </button>
          </div>

          {/* Product Total Price */}
          <div className=" lg:text-left text-right w-1/3 lg:w-auto">
            <span>{`LE ${cartProduct.TotalProductPrice}`}</span>
          </div>
        </td>
      </tr>
    </>
  );
  // return (
  //   <>
  //     <tr className="font-poppins text-sm text-gray-500">
  //       <td className="flex flex-col lg:flex-row lg:justify-between lg:space-x-4 space-y-4 lg:space-y-0 pt-16">
  //         {/* Product Info */}
  //         <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 w-full lg:w-1/6">
  //           <img
  //             className="w-24 h-24 lg:w-32 lg:h-32 border-2 border-solid border-gray-200"
  //             src={cartProduct.ProductImg}
  //             alt=""
  //           />
  //           <div className="flex flex-col space-y-3">
  //             <span>{cartProduct.ProductName}</span>
  //             <span>{`LE ${cartProduct.ProductPrice}`}</span>
  //           </div>
  //         </div>

  //         {/* Quantity Control */}
  //         <div className="flex flex-row justify-between items-center space-x-4 lg:w-1/6">
  //           <div className="flex justify-evenly items-center border-2 border-gray-300 py-2 lg:py-3 h-12 lg:h-1/3 w-1/2 lg:w-3/4">
  //             <button
  //               className={` font-bold py-2 px-2 rounded ${
  //                 cartProduct.qty === 1
  //                   ? "cursor-not-allowed opacity-50"
  //                   : "hover:bg-red-800 hover:text-white"
  //               }`}
  //               onClick={handelCartProductDecrease}
  //               disabled={cartProduct.qty === 1}
  //             >
  //               -
  //             </button>
  //             <span>{cartProduct.qty}</span>
  //             <button
  //               onClick={handelCartProductIncrease}
  //               className={` font-bold py-2 px-2 rounded 
                  
                    
  //                    hover:bg-green-800 hover:text-white
  //               `}
  //             >
  //               +
  //             </button>
  //           </div>
  //           <button className="text-red-700" onClick={handelCartProductDelete}>
  //             <FaTrashAlt />
  //           </button>
  //         </div>

  //         {/* Product Total Price */}
  //         <div className=" flex flex-col justify-center items-center lg:text-left text-center lg:w-auto">
  //           <span>{`LE ${cartProduct.TotalProductPrice}`}</span>
  //         </div>
  //       </td>
  //     </tr>
  //   </>
  // );
}

export default SingleCartProduct;

// import React from "react";
// import { FaTrashAlt } from "react-icons/fa";

// function SingleCartProduct({ cartProduct }) {
//   return (
//     <>
//       <tr className="font-poppins text-sm text-gray-500">
//         <td className="flex flex-row justify-between space-x-4 pt-16 ">
//           <div className="flex flex-row space-x-6 w-1/6">
//             <img
//               className="w-32 h-32 border-2 border-solid border-gray-200"
//               src={cartProduct.ProductImg}
//               alt=""
//             />
//             <div className="flex flex-col space-y-3">
//               <span>{cartProduct.ProductName}</span>
//               <span>{`LE ${cartProduct.ProductPrice}`}</span>
//             </div>
//           </div>
//           <div className="h-1/3 w-1/6 flex justify-between items-center ">
//             <div class="flex justify-evenly items-center border-2 border-gray-300 py-3 h-1/3 w-3/4">
//               <button class="px-2">-</button>
//               <span>{cartProduct.qty}</span>
//               <button class="px-2">+</button>
//             </div>
//             <button>
//               <FaTrashAlt />
//             </button>
//           </div>

//           <div>
//             <span>{`LE ${cartProduct.TotalProductPrice}`}</span>
//           </div>
//         </td>
//       </tr>
//     </>
//   );
// }

// export default SingleCartProduct;
