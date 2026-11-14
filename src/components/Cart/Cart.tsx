import { useTypedSelector } from "../../hooks/redux";
import CartItem from "../CartItem/CartItem";
import cartEmptyImage from "../../assets/cart-empty.svg";
import Style from "./Cart.style.module.scss";

const Cart = () => {
  const products = useTypedSelector((state) => state.basket.products);

  if (products.length === 0) {
    return (
      <div className={Style["cart-empty"]}>
        <img
          className={Style["cart-empty-image"]}
          src={cartEmptyImage}
          alt=""
        />

        <p className={Style["cart-empty-text"]}>Your cart is empty!</p>
      </div>
    );
  }

  let totalPrice = 0;

  for (const product of products) {
    totalPrice += product.price * product.quantity;
  }

  return (
    <div className={Style["cart"]}>
      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}

      <div className={Style["cart-total"]}>
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default Cart;
