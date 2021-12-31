import { useContext } from "react";
import Product from "../product/Product";
import classes from "./Products.module.scss";
// import { useQuery, PRODUCTS } from "./../../graphQL/GraphqlProvider";
import { CartContext } from "../../contextApi/CartContext";

const Products = ({ setShow }) => {
  const cartCtx = useContext(CartContext);
  const {
    productsLoading: loading,
    productsError: error,
    productsData: data,
  } = cartCtx.getProducts();

  // const { loading, error, data } = useQuery(PRODUCTS, {
  //   variables: { currency },
  // });

  if (loading)
    return (
      <div style={{ fontSize: "5rem", marginTop: "40vh" }}>Loading...</div>
    );
  if (error)
    return (
      <div style={{ fontSize: "5rem", marginTop: "40vh", color: "red" }}>
        Error
      </div>
    );
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.products}>
          {data.products.map((prod) => (
            <Product
              key={prod.id}
              id={prod.id}
              image_url={prod.image_url}
              price={prod.price}
              title={prod.title}
              setShow={setShow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
