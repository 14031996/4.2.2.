import { Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import type { Product } from "../../types/Product";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { addProduct } from "../../store/reducers/BasketSlice";
import { changeProductQuantity } from "../../store/reducers/ProductSlice";
import CountCounter from "../CountCounter/CountCounter";
import Style from "./ProductCard.style.module.scss";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useTypedDispatch();

  const quantity = useTypedSelector(
    (state) => state.products.quantities[product.id] ?? 1,
  );

  const [name, weight] = product.name.split(" - ");

  const handleChangeQuantity = (quantity: number) => {
    dispatch(
      changeProductQuantity({
        id: product.id,
        quantity,
      }),
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addProduct({
        product,
        quantity,
      }),
    );
  };

  return (
    <article className={Style["product-card"]}>
      <img
        className={Style["product-image"]}
        src={product.image}
        alt={product.name}
      />

      <div className={Style["product-info"]}>
        <div className={Style["product-title"]}>
          <h2 className={Style["product-name"]}>{name}</h2>

          {weight && <span className={Style["product-weight"]}>{weight}</span>}
        </div>

        <CountCounter quantity={quantity} onChange={handleChangeQuantity} />
      </div>

      <div className={Style["product-bottom"]}>
        <span className={Style["product-price"]}>$ {product.price}</span>

        <Button
          color="#3b944e"
          variant="light"
          radius="md"
          rightSection={<IconShoppingCart size={20} />}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
