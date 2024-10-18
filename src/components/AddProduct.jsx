import React, { useState } from "react";
import { storage, db } from "../config/Confij";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, runTransaction, setDoc } from "firebase/firestore";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); 

  const addProduct = (e) => {
    e.preventDefault();

    if (!productImg) {
      setError("Please upload a product image.");
      return;
    }

    
    setIsUploading(true);
    setError("");

    
    const storageRef = ref(storage, `product-images/${productImg.name}`);

    
    const uploadTask = uploadBytesResumable(storageRef, productImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); 
        console.log(`Upload is ${progress}% done`);
      },
      (err) => {
        
        setError(err.message);
        setIsUploading(false); 
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          
          const counterRef = doc(db, "Counters", "productsCounter");

          runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            if (!counterDoc.exists()) {
              throw new Error("Counter document does not exist!");
            }

            
            const newCount = counterDoc.data().currentCount + 1;

            
            transaction.update(counterRef, { currentCount: newCount });

            
            const productID = `product${newCount}`;

            
            const productRef = doc(db, "Products", productID);
            transaction.set(productRef, {
              ProductID: productID,
              ProductName: productName,
              productPrice: Number(productPrice),
              ProductImg: url,
            });
          })
            .then(() => {
              
              setProductName("");
              setProductPrice(0);
              setProductImg(null);
              setError("");
              setSuccessMessage("The product was added successfully!");
              document.getElementById("productimg").value = "";
              setIsUploading(false); 
            })
            .catch((err) => {
              setError(err.message);
              setIsUploading(false); 
            });
        });
      }
    );
  };

  return (
    <div className="container flex flex-col space-y-8 p-4 sm:p-6 md:p-12">
      <div>
        <p className="font-poppins text-lg">Add Products</p>
      </div>
      <div>
        <form action="" autoComplete="off" onSubmit={addProduct}>
          <div className="flex flex-col space-y-8">
            <input
              type="text"
              required
              id="productname"
              placeholder="product name"
              name="productname"
              className="w-full sm:w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <input
              type="number"
              required
              id="productprice"
              placeholder="product price"
              name="productprice"
              className="w-full sm:w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
            <input
              type="file"
              required
              id="productimg"
              name="productimage"
              className="w-full sm:w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductImg(e.target.files[0])}
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="font-poppins bg-green-700 text-white p-3 w-full sm:w-1/4"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Add"}
            </button>
          </div>
          
          {isUploading && <p>Upload progress: {uploadProgress.toFixed(0)}%</p>}
          {error && <span style={{ color: "red" }}>{error}</span>}
          {successMessage && (
            <span style={{ color: "green" }}>{successMessage}</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddProduct;

