import React, { useEffect } from "react";

const Stepnine = () => {
  //   1. Calculate the Total Price After Discount
  // Problem:
  // You’re shopping online, and there’s a 10% discount for orders over $50.
  //  Write a function to calculate the total price after applying the discount if applicable.
  const cal = () => {
    const discount = 10;
    const productOne = 50;
    const productTwo = 50;
    const totalPrice = productOne + productTwo;
    let afterDiscount;
    if (totalPrice > 50) {
      afterDiscount = (productOne / productTwo) * discount
    } else {
    }
  };

  useEffect(() => {
    cal();
  }, []);

  return <div>Stepnine</div>;
};

export default Stepnine;


