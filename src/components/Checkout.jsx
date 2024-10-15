import React, { useEffect, useState } from "react";
import { auth, db } from "../config/Confij.jsx";
import { collection, onSnapshot, addDoc, Timestamp,deleteDoc,getDocs } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

import Navcheckout from "./Navcheckout.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function Checkout() {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [governorate, setGovernorate] = useState("");
    const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleGovernorateChange = (e) => setGovernorate(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  const notify = () => toast.success("Your Order was placed successfully!");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const cartRef = collection(db, "Cart" + user.uid);

        const unsubscribeSnapshot = onSnapshot(cartRef, (snapshot) => {
          const fetchedCartProducts = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
          }));

          setCartProducts(fetchedCartProducts);

          const totalQuantity = fetchedCartProducts.reduce(
            (acc, product) => acc + product.qty,
            0
          );
          setTotalQty(totalQuantity);

          const totalPrice = fetchedCartProducts.reduce(
            (acc, product) => acc + product.TotalProductPrice,
            0
          );
          setTotalPrice(totalPrice);
          setLoading(false);
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, []);
  const egyptGovernorates = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Luxor",
    "Aswan",
    "Asyut",
    "Beheira",
    "Beni Suef",
    "Dakahlia",
    "Damietta",
    "Faiyum",
    "Gharbia",
    "Ismailia",
    "Kafr El Sheikh",
    "Matruh",
    "Minya",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Red Sea",
    "Sharqia",
    "Sohag",
    "South Sinai",
    "Suez",
  ];

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      email: email,
      firstName: firstName,
      lastName: LastName,
      address: Address,
      city: City,
      governorate: governorate,
      phone: phone,
      cartProducts: cartProducts,
      totalQty: totalQty,
      totalPrice: totalPrice + 50,
      createdAt: Timestamp.now(),
    };

    try {
      const orderRef = collection(db, "Orders");
      await addDoc(orderRef, orderData);

      const cartRef = collection(db, "Cart" + auth.currentUser.uid);
      const cartSnapshot = await getDocs(cartRef);

      const deletePromises = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      console.log("Cart items deleted successfully");

      
      setCartProducts([]);
      setTotalQty(0);
      setTotalPrice(0);

        notify();
        setTimeout(() => {
          navigate("/");
        }, 4000);
        
        
    } catch (error) {
      console.error("Error placing order: ", error);
    }
  };

  return (
    <>
      <Navcheckout />
      <div className="grid grid-cols-2">
        <div className="pr-16 pl-56">
          <div className="w-full">
            <form className="w-full pt-3" onSubmit={handleOrderSubmit}>
              <div>
                <p className="text-xl   my-3">Contact</p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 py-3 px-3 rounded-md"
                />
              </div>
              <div>
                <p className="text-xl   my-3">Delivery</p>
                <div className="flex justify-between">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={handleFirstNameChange}
                    placeholder="First name"
                    className="w-64 border border-gray-300 py-3 px-3 rounded-md"
                  />
                  <input
                    type="text"
                    required
                    value={LastName}
                    onChange={handleLastNameChange}
                    placeholder="Last name"
                    className=" border border-gray-300 py-3 px-3 rounded-md"
                  />
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    required
                    value={Address}
                    onChange={handleAddressChange}
                    placeholder="Address"
                    className="w-full border border-gray-300 py-3 px-3 rounded-md"
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <input
                    type="text"
                    value={City}
                    onChange={handleCityChange}
                    placeholder="City"
                    required
                    className="w-64 border border-gray-300 py-3 px-3 rounded-md"
                  />
                  <select
                    value={governorate}
                    onChange={handleGovernorateChange}
                    className=" w-52 border border-gray-300 py-3 px-3 rounded-md"
                    required
                  >
                    {egyptGovernorates.map((governorate, index) => (
                      <option key={index} value={governorate} className="">
                        {governorate}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3">
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Phone number"
                    pattern="[0]{1}[1]{1}[0-9]{9}"
                    required
                    className="w-full border border-gray-300 py-3 px-3 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className=" mt-3 w-full text-center bg-black text-white text-lg py-4 rounded-md font-poppins"
                  
                >
                  Complete order
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  transition={Bounce}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="bg-zinc-100 h-screen pl-16 pr-56 font-poppins pt-16 shadow-xl">
          <div className="flex flex-col space-y-4">
            {loading ? ( // Show spinner while loading
              <div className="flex justify-center items-center h-full">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
              </div>
            ) : (
              cartProducts.map((product) => {
                return (
                  <div
                    key={product.ID}
                    className="flex justify-between text-xs text-gray-600"
                  >
                    <div className="flex space-x-3 relative">
                      <span className="absolute top-0 left-0 rounded-full py-1 px-3 bg-stone-400 text-white font-poppins font-bold text-sm">
                        {product.qty}
                      </span>
                      <img
                        className="w-16 h-16 rounded-md border border-gray-300 border-solid"
                        src={product.ProductImg}
                        alt=""
                      />
                      <div className="h-full flex flex-col justify-center">
                        <span>{product.ProductName}</span>
                      </div>
                    </div>
                    <div>
                      <div className="h-full flex flex-col justify-center">
                        <span>{`LE ${product.TotalProductPrice}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex justify-between text-sm text-gray-800 pt-8 pl-3 border-b border-gray-300 border-solid ">
            <span>{`Subtotal for ${totalQty} items`}</span>
            <span>{`LE ${totalPrice}`}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-800 pt-8 pl-3 border-b border-gray-300 border-solid ">
            <span>{`Shipping`}</span>
            <span>{`LE 50`}</span>
          </div>
          <div className="flex justify-between text-gray-800 pt-8 pl-3 font-extrabold text-lg ">
            <span>{`Total`}</span>
            <span>{`LE ${totalPrice + 50}`}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
