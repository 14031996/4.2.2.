import type { BasketProduct } from "../../types/Product";
import { useTypedDispatch } from "../../hooks/redux";
import { changeQuantity } from "../../store/reducers/BasketSlice";
import CountCounter from "../CountCounter/CountCounter";
import Style from "./CartItem.style.module.scss";

type CartItemProps = {
  product: BasketProduct;
};

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useTypedDispatch();
  const [name, weight] = product.name.split(" - ");

  const handleChangeQuantity = (quantity: number) => {
    dispatch(
      changeQuantity({
        id: product.id,
        quantity,
      }),
    );
  };

  return (
    <div className={Style["cart-item"]}>
      <img
        className={Style["cart-item-image"]}
        src={product.image}
        alt={name}
      />

      <div className={Style["cart-item-info"]}>
        <div className={Style["cart-item-title"]}>
          <span className={Style["cart-item-name"]}>{name}</span>
          <span className={Style["cart-item-weight"]}>{weight}</span>
        </div>

        <div className={Style["cart-item-bottom"]}>
          <span className={Style["cart-item-price"]}>
            $ {product.price * product.quantity}
          </span>

          <CountCounter
            quantity={product.quantity}
            onChange={handleChangeQuantity}
            min={0}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
