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
  const [loading, setLoading] = useState(true); 
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid); 
          const userSnapshot = await getDoc(userDocRef); 
          if (userSnapshot.exists()) {
            setUser(userSnapshot.data().FullName); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
    });

    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const cartCollectionRef = collection(db, "Cart" + user.uid);

        
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

        
        return () => unsubscribeSnapshot();
      } else {
        console.log("User is not signed in to retrieve cart");
        setLoading(false);
      }
    });

    
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
  
  

  
  let Product;

  // cart product increase function
  const cartProductIncrease = (cartProduct) => {
    //console.log(cartProduct);
    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.ProductPrice;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const productRef = doc(db, "Cart" + user.uid, cartProduct.ID);

        
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

  
  const cartProductDecrease = (cartProduct) => {
    
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.ProductPrice;
    }
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
        const productRef = doc(db, "Cart" + user.uid, cartProduct.ID);

        
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
        const cartRef = collection(db, "Cart" + user.uid); 

        
        const unsubscribeSnapshot = onSnapshot(cartRef, (snapshot) => {
          const qty = snapshot.docs.length; 
          setTotalProducts(qty); 
        });

        
        return () => unsubscribeSnapshot();
      }
    });

    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [cartProducts]);

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
            <div className=" py-10 px-6 lg:px-48">
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
            <div className=" flex flex-col items-center justify-center space-y-6 font-poppins py-20 lg:py-36">
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

      <div className="border-t border-solid border-gray-400 py-6 px-4 sm:px-10 md:px-20 lg:px-44">
        <div>
          <p className="text-gray-500">Order special instructions</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mt-4">
          <div className="w-full md:w-1/2">
            <textarea
              name=""
              id=""
              className="border border-solid border-gray-400 w-full h-32 p-2"
            ></textarea>
          </div>
          <div className="w-full md:w-1/2 flex flex-col md:items-end space-y-4 mt-4 md:mt-0 sm:items-start">
            <div className="text-gray-500 flex space-x-3">
              <span>Total NO products</span>
              <span className="text-lg text-black">{totalQty}</span>
            </div>
            <div className="text-gray-500 flex space-x-3">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-lg text-black">{`LE ${totalPrice} EGP`}</span>
            </div>
            <div className="text-gray-400 text-sm">
              taxes and shipping are calculated at checkout
            </div>
            <div className="w-full md:w-1/2">
              <button
                className={`w-full py-2 bg-black text-white hover:scale-105 font-poppins ${
                  isDisabled
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "hover:bg-green-600"
                }`}
                onClick={() => {
                  navigate("/checkout");
                }}
                disabled={isDisabled}
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
