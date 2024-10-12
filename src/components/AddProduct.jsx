import React, { useState } from "react";
import { storage, db } from "../config/Confij";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, doc, runTransaction, setDoc } from "firebase/firestore";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress

  const addProduct = (e) => {
    e.preventDefault();

    if (!productImg) {
      setError("Please upload a product image.");
      return;
    }

    // Disable the "Add" button during upload
    setIsUploading(true);
    setError("");

    // Create a storage reference
    const storageRef = ref(storage, `product-images/${productImg.name}`);

    // Upload the image to Firebase Storage using uploadBytesResumable
    const uploadTask = uploadBytesResumable(storageRef, productImg);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track the upload progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress); // Update progress for UI
        console.log(`Upload is ${progress}% done`);
      },
      (err) => {
        // Handle errors during upload
        setError(err.message);
        setIsUploading(false); // Enable button if upload fails
      },
      () => {
        // Get the download URL once the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // Use a Firestore transaction to increment the product count and add the product with a meaningful ID
          const counterRef = doc(db, "Counters", "productsCounter");

          runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);
            if (!counterDoc.exists()) {
              throw new Error("Counter document does not exist!");
            }

            // Increment the product count
            const newCount = counterDoc.data().currentCount + 1;

            // Update the counter in Firestore
            transaction.update(counterRef, { currentCount: newCount });

            // Create a custom product document ID like "product1", "product2", etc.
            const productID = `product${newCount}`;

            // Add the new product to Firestore with the custom ID
            const productRef = doc(db, "Products", productID);
            transaction.set(productRef, {
              ProductID: productID,
              ProductName: productName,
              productPrice: Number(productPrice),
              ProductImg: url,
            });
          })
            .then(() => {
              // Reset form fields after successful addition
              setProductName("");
              setProductPrice(0);
              setProductImg(null);
              setError("");
              setSuccessMessage("The product was added successfully!");
              document.getElementById("productimg").value = "";
              setIsUploading(false); // Re-enable button
            })
            .catch((err) => {
              setError(err.message);
              setIsUploading(false); // Re-enable button if transaction fails
            });
        });
      }
    );
  };

  return (
    <div className="container flex flex-col space-y-8 p-12">
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
              className="w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <input
              type="number"
              required
              id="productprice"
              placeholder="product price"
              name="productprice"
              className="w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
            />
            <input
              type="file"
              required
              id="productimg"
              name="productimage"
              className="w-1/2 border-2 border-solid border-gray-400 p-3"
              onChange={(e) => setProductImg(e.target.files[0])}
            />
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="font-poppins bg-green-700 text-white p-3 w-1/12"
              disabled={isUploading} // Disable button during upload
            >
              {isUploading ? "Uploading..." : "Add"} {/* Show upload state */}
            </button>
          </div>
          {/* Show upload progress */}
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

// import React, { useState } from "react";
// import { storage, db } from "../config/Confij";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";

// function AddProduct() {
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState(0);
//   const [productImg, setProductImg] = useState(null);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const addProduct = (e) => {
//     e.preventDefault();

//     if (!productImg) {
//       setError("Please upload a product image.");
//       return;
//     }

//     // Create a storage reference
//     const storageRef = ref(storage, `product-images/${productImg.name}`);

//     // Upload the image to Firebase Storage using uploadBytesResumable
//     const uploadTask = uploadBytesResumable(storageRef, productImg);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Track the upload progress
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(`Upload is ${progress}% done`);
//       },
//       (err) => {
//         // Handle errors during upload
//         setError(err.message);
//       },
//       () => {
//         // Get the download URL once the upload is complete
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           // Add product to Firestore database
//           addDoc(collection(db, "Products"), {
//             ProductName: productName,
//             productPrice: Number(productPrice),
//             ProductImg: url,
//           })
//             .then(() => {
//               // Reset form fields after successful addition
//               setProductName("");
//               setProductPrice(0);
//               setProductImg(null);
//               setError("");
//               setSuccessMessage("The product was added successfully!");
//               document.getElementById("productimg").value = "";
//             })
//             .catch((err) => setError(err.message));
//         });
//       }
//     );
//   };

//   return (
//     <div className="container flex flex-col space-y-8 p-12">
//       <div>
//         <p className="font-poppins text-lg">Add Products</p>
//       </div>
//       <div>
//         <form action="" autoComplete="off" onSubmit={addProduct}>
//           <div className="flex flex-col space-y-8">
//             <input
//               type="text"
//               required
//               id="productname"
//               placeholder="product name"
//               name="productname"
//               className="w-1/2 border-2 border-solid border-gray-400 p-3"
//               onChange={(e) => setProductName(e.target.value)}
//               value={productName}
//             />
//             <input
//               type="number"
//               required
//               id="productprice"
//               placeholder="product price"
//               name="productprice"
//               className="w-1/2 border-2 border-solid border-gray-400 p-3"
//               onChange={(e) => setProductPrice(e.target.value)}
//               value={productPrice}
//             />
//             <input
//               type="file"
//               required
//               id="productimg"
//               name="productimage"
//               className="w-1/2 border-2 border-solid border-gray-400 p-3"
//               onChange={(e) => setProductImg(e.target.files[0])}
//             />
//           </div>
//           <div className="mt-8">
//             <button
//               type="submit"
//               className="font-poppins bg-green-700 text-white p-3 w-1/12"
//             >
//               Add
//             </button>
//           </div>
//           {error && <span style={{ color: "red" }}>{error}</span>}
//           {successMessage && (
//             <span style={{ color: "green" }}>{successMessage}</span>
//           )}{" "}
//           {/* Display success message */}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;
