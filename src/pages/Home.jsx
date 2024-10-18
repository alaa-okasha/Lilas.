import React,{useEffect,useState} from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Main from "../components/Main";
import { auth, db } from "../config/Confij.jsx";
import { doc, getDoc,setDoc,onSnapshot,collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; 
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Parallax from "../components/Parallax.jsx";
import Modal from "../components/Modal.jsx";
import Modal2 from "../components/Modal2.jsx";
import Footer from "../components/Footer.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";



function Home() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  const [uid, setUid] = useState(null);

    const notify = () => toast.success("The product was added to cart!");


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid); 
      } else {
        setUid(null); 
      }
    });

    
    return () => unsubscribe();
  }, []);

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
    if (user) {
      console.log(user); 
    }
  }, [user]); 

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
  },[])

  let Product;

  const addToCart = (product) => {
    if (uid !== null) {
      
      Product = product;
      Product['qty'] = 1;
      Product['TotalProductPrice'] = Product.qty * Product.ProductPrice;
      const productRef = doc(db, "Cart" + uid, product.ProductID);

      
      setDoc(productRef, Product)
        .then(() => {
          notify();

        })
        .catch((error) => {
          console.error("Error adding to cart: ", error);
        });
      
      
    } else {

      navigate("/login")
      
    }
  };

  
  

  return (
    <>
      <Nav user={user} totalProducts={totalProducts} />
      <div className="overflow-x-hidden">
        
        <Hero />
        <Main addToCart={addToCart} />
        <Parallax />
        <Modal />
        <Modal2 />
        <Footer />
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
    </>
  );
}

export default Home;
