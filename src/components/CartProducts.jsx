import React from "react";
import SingleCartProduct from "./SingleCartProduct";

function CartProducts({
  cartProducts,
  cartProductIncrease,
  cartProductDecrease,
  cartProductDelete,
}) {
  return cartProducts.map((cartProduct) => (
    <SingleCartProduct
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
      cartProductDelete={cartProductDelete}
    />
  ));
}

export default CartProducts;
