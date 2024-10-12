import React, { useContext,useEffect,useState } from "react";
import Card from "./Card";
import { ProductsContext } from "../global/ProductsContext";
import swal from "sweetalert";


function main({addToCart}) {
  const products = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false); 
    }
  }, [products]); 

  return (
    <>
      <div className="py-6 px-60">
        <div>
          <p className="pl-6 text-xl text-gray-600">
            Lilas signatures; The Pinnacle of Luxurious Elegance
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            {/* Loading Spinner */}
            <div className="w-16 h-16 border-4 border-dashed border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.ProductID} // Unique key for each product
                // productName={product.ProductName}
                // productPrice={product.ProductPrice}
                // productImg={product.ProductImg}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
        {/* <div className="grid grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.ProductID} // Unique key for each product
              // productName={product.ProductName}
              // productPrice={product.ProductPrice}
              // productImg={product.ProductImg}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div> */}
      </div>
    </>
  );
}

export default main;
