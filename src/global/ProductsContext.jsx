import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "../config/Confij"; 

export const ProductsContext = createContext();

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const productsCollectionRef = collection(db, "Products");

    
    const unsubscribe = onSnapshot(productsCollectionRef, (snapshot) => {
      const changes = snapshot.docChanges();
      setProducts((prevProducts) => {
        let updatedProducts = [...prevProducts];

        changes.forEach((change) => {
          if (change.type === "added") {
            updatedProducts.push({
              ProductID: change.doc.id,
              ProductName: change.doc.data().ProductName,
              ProductPrice: change.doc.data().productPrice,
              ProductImg: change.doc.data().ProductImg,
            });
          }
          
          if (change.type === "modified") {
            const index = updatedProducts.findIndex(
              (product) => product.ProductID === change.doc.id
            );
            if (index !== -1) {
              updatedProducts[index] = {
                ...updatedProducts[index],
                ProductName: change.doc.data().ProductName,
                ProductPrice: change.doc.data().productPrice,
                ProductImg: change.doc.data().ProductImg,
              };
            }
          }
          if (change.type === "removed") {
            updatedProducts = updatedProducts.filter(
              (product) => product.ProductID !== change.doc.id
            );
          }
        });

        return updatedProducts;
      });
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
