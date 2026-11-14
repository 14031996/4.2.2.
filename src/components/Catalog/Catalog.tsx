import { useEffect } from "react";
import { Loader } from "@mantine/core";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { fetchProducts } from "../../store/thunks/ProductThunks";
import ProductCard from "../ProductCard/ProductCard";
import Style from "./Catalog.style.module.scss";

const Catalog = () => {
  const dispatch = useTypedDispatch();

  const { products, loading, error } = useTypedSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  let content;

  if (loading) {
    content = <Loader color="#54b46a" />;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (products.length === 0) {
    content = <p>Товары не найдены</p>;
  } else {
    content = (
      <div className={Style["products"]}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <main className={Style["catalog"]}>
      <h1>Catalog</h1>
      {content}
    </main>
  );
};

export default Catalog;
