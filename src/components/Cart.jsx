import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { auth, db } from "../config/Confij.jsx";
import { doc, getDoc, setDoc, updateDoc,deleteDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Hero from "./Hero.jsx";
import CartProducts from "./CartProducts.jsx";
import swal from "sweetalert";
import Footer from "./Footer.jsx";


function Cart() {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid); // Create doc reference
          const userSnapshot = await getDoc(userDocRef); // Get the document
          if (userSnapshot.exists()) {
            setUser(userSnapshot.data().FullName); // Set user FullName to state
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });

    // Clean up subscription to prevent memory leaks
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference to the Cart collection for the signed-in user
        const cartCollectionRef = collection(db, "Cart" + user.uid);

        // Listen for real-time updates using onSnapshot
        const unsubscribeSnapshot = onSnapshot(
          cartCollectionRef,
          (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setCartProducts(newCartProduct);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching cart products:", error);
          }
        );

        // Cleanup the onSnapshot listener when the component unmounts
        return () => unsubscribeSnapshot();
      } else {
        console.log("User is not signed in to retrieve cart");
        setLoading(false);
      }
    });

    // Cleanup the onAuthStateChanged listener when the component unmounts
    return () => unsubscribeAuth();
  }, []);

  const qty = cartProducts.map(cartProduct => {
    return cartProduct.qty;
  })

  const reducerOfQty = (accumulator, currentValue) => accumulator + currentValue;

  const totalQty = qty.reduce(reducerOfQty, 0);
  console.log(totalQty);


  const price = cartProducts.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  })

  const reducerOfPrice = (accumulator, currentValue) => accumulator + currentValue;

  const totalPrice = price.reduce(reducerOfPrice, 0);
  
  

  // global variable
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    //console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.ProductPrice;
    //updating in database
    // Check the authenticated user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference to the specific cart item in Firestore
        const productRef = doc(db, "Cart" + user.uid, cartProduct.ID);

        // Update the document in Firestore
        updateDoc(productRef, {
          qty: Product.qty,
          TotalProductPrice: Product.TotalProductPrice,
        })
          .then(() => {
            console.log("Product has been incremented");
          })
          .catch((error) => {
            console.error("Error updating product: ", error);
          });
      } else {
        console.log("User is not logged in");
      }
    });
  };

  // cart product decrease function
  const cartProductDecrease = (cartProduct) => {
    //console.log(cartProduct);
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.ProductPrice;
    }
    //updating in database
    // Check the authenticated user
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference to the specific cart item in Firestore
        const productRef = doc(db, "Cart" + user.uid, cartProduct.ID);

        // Update the document in Firestore
        updateDoc(productRef, {
          qty: Product.qty,
          TotalProductPrice: Product.TotalProductPrice,
        })
          .then(() => {
            console.log("Product has been decremented");
          })
          .catch((error) => {
            console.error("Error updating product: ", error);
          });
      } else {
        console.log("User is not logged in");
      }
    });
  };

  const cartProductDelete = (cartProduct) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const productRef = doc(db, "Cart" + user.uid, cartProduct.ID);
        deleteDoc(productRef)
          .then(() => {
            console.log("the product was deleted");
            

          })
          .catch((error) => {
            console.error("Error deleting product: ", error);
          });
      }
    });
  };
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartRef = collection(db, "Cart" + user.uid); // Get reference to Cart collection

        // Listen to the cart collection and update the total number of products
        const unsubscribeSnapshot = onSnapshot(cartRef, (snapshot) => {
          const qty = snapshot.docs.length; // Count the documents in the snapshot
          setTotalProducts(qty); // Set the total products count in the state
        });

        // Cleanup snapshot listener when the component unmounts
        return () => unsubscribeSnapshot();
      }
    });

    // Cleanup auth listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Nav user={user} totalProducts={totalProducts} />
      <Hero />
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-dashed border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {cartProducts.length > 0 && (
            <div className="container py-10 px-6 lg:px-48">
              <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start font-poppins space-y-6 lg:space-y-0">
                <span className="text-2xl lg:text-4xl">Your Cart</span>
                <Link to="/">
                  <span className="border-b-2 border-solid border-black hover:border-b-4 font-light">
                    continue shopping
                  </span>
                </Link>
              </div>

              <div>
                <table className="w-full mt-8 lg:mt-12">
                  <thead>
                    <tr className="border-b border-solid border-gray-400 flex flex-row justify-between text-sm lg:text-base text-gray-500">
                      <td>PRODUCT</td>
                      <td>QUANTITY</td>
                      <td>TOTAL</td>
                    </tr>
                  </thead>
                  <tbody>
                    <CartProducts
                      cartProducts={cartProducts}
                      cartProductIncrease={cartProductIncrease}
                      cartProductDecrease={cartProductDecrease}
                      cartProductDelete={cartProductDelete}
                    />
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {cartProducts.length < 1 && (
            <div className="container flex flex-col items-center justify-center space-y-6 font-poppins py-20 lg:py-36">
              <div className="text-2xl lg:text-4xl">Your cart is empty</div>
              <div>
                <Link to="/">
                  <button className="bg-gray-900 text-white py-2 lg:py-4 px-4 lg:px-6 hover:scale-105">
                    continue shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      )}

      <div className="container border-t border-solid border-gray-400 py-6 px-44">
        <div>
          <p className="text-gray-500">Order special instructions</p>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="w-1/2">
            <textarea
              name=""
              id=""
              className="border border-solid border-gray-400 w-full h-32 p-2"
            ></textarea>
          </div>
          <div className="w-1/2 flex flex-col items-end space-y-4">
            <div className="text-gray-500 flex space-x-3">
              <span>Total NO of products</span>
              <span className="text-lg text-black">{totalQty}</span>
            </div>
            <div className="text-gray-500 flex space-x-3">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-lg text-black">{`LE ${totalPrice} EGP`}</span>
            </div>
            <div className="text-gray-400 text-sm">
              taxes and shipping are calculated at checkout
            </div>
            <div className="w-1/2">
              <button className="w-full py-2 bg-black text-white hover:scale-105 font-poppins">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cart;
