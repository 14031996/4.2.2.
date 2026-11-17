import type { ChangeEvent } from "react";
import Style from "./CountCounter.style.module.scss";

type CountCounterProps = {
  quantity: number;
  onChange: (value: number) => void;
  min?: number;
};

const CountCounter = ({ quantity, onChange, min = 1 }: CountCounterProps) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    if (value >= min && Number.isInteger(value)) {
      onChange(value);
    }
  };

  return (
    <div className={Style["count-counter"]}>
      <button
        type="button"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="Уменьшить количество"
      >
        −
      </button>

      <input
        type="number"
        min={min}
        step={1}
        value={quantity}
        aria-label="Количество товара"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
};

export default CountCounter;
