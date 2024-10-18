import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { ProductsContext } from "../global/ProductsContext";

function main({ addToCart }) {
  const products = useContext(ProductsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  return (
    <>
      <div className="py-6 px-4 sm:px-8 lg:px-20 xl:px-60">
        <div>
          <p className="pl-2 sm:pl-4 lg:pl-6 text-base sm:text-lg lg:text-xl text-gray-600">
            Lilas signatures; The Pinnacle of Luxurious Elegance
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-dashed border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <Card
                key={product.ProductID}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default main;
