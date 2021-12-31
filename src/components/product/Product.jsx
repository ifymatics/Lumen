import { useContext } from "react";
import { CartContext } from "../../contextApi/CartContext";
import Card from "../shared/card/Card";
import classes from "./Product.module.scss";

const Product = ({ id, title, price, image_url, setShow }) => {
  const cartCtx = useContext(CartContext);
  const onClickAddToCart = (id) => {
    cartCtx.addToCart({ id, title, price, image_url });
    setShow(true);
  };
  return (
    <Card className={classes.product}>
      <div className={classes.image_url}>
        <img className={classes.img} src={image_url} alt={title} />
      </div>
      <div className={classes.title}>
        <p>{title}</p>
      </div>
      <div className={classes.price}>
        <h3>
          {" "}
          <span style={{ fontWeight: "450" }}>From </span>
          {cartCtx.getCurrencySymbol() === "USD"
            ? "$"
            : cartCtx.getCurrencySymbol() + " "}
          {price}
        </h3>
      </div>
      <button onClick={() => onClickAddToCart(id)}>Add to Cart</button>
    </Card>
  );
};

export default Product;
