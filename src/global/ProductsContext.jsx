import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore"; // Modular Firestore imports
import { db } from "../config/Confij"; // Assuming db is your initialized Firestore instance

export const ProductsContext = createContext();

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Reference to the 'Products' collection
    const productsCollectionRef = collection(db, "Products");

    // Real-time listener using onSnapshot
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
          // If you want to handle 'modified' and 'removed' as well:
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

    // Cleanup on component unmount to prevent memory leaks
    return () => unsubscribe();
  }, []);

  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}
