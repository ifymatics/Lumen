import { useState, useContext } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { CartContext } from "../../contextApi/CartContext";
import classes from "./Cart.module.scss";

const Cart = ({ show, setShow }) => {
  const cartCtx = useContext(CartContext);
  const [open, setOpen] = useState(false);
  // const { loading, error, data } = useQuery(CURRENCY);
  const {
    currencyLoading: loading,
    currencyError: error,
    currencyData: data,
  } = cartCtx.getCurrency();
  // console.log(cartCtx.getCurrency());

  const handleClose = () => {
    setShow(false);
  };
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleOnclick = (currency) => {
    cartCtx.selectCurrency(currency);
    setOpen(false);
    //console.log(productData);
  };

  return (
    show && (
      <>
        <div className={classes.backdrop}></div>
        <div className={classes.cart}>
          <div className={classes.container}>
            <h1 className={classes.title}>My Shopping Cart</h1>
            <div className={classes.navActions}>
              <div className={classes.back}>
                <ArrowForwardIosOutlinedIcon
                  style={{ fontSize: "1.2rem" }}
                  onClick={handleClose}
                />
              </div>
              <div className={classes.currency}>
                <span>
                  <h3>{cartCtx.getCurrencySymbol()}</h3>
                  <div className={classes.dropdownIcon}>
                    {open && (
                      <div className={classes.options}>
                        {loading && <div>Loading...</div>}
                        {error && <span>Error</span>}
                        {data.currency.length &&
                          data.currency.map((curr) => (
                            <div key={curr} onClick={() => handleOnclick(curr)}>
                              {curr}
                            </div>
                          ))}
                      </div>
                    )}
                    <ArrowDropDownOutlinedIcon
                      style={{ fontSize: "2.5rem" }}
                      onClick={toggleOpen}
                    />
                  </div>
                </span>
              </div>
            </div>
            <div className={classes.shopItems}>
              {cartCtx.getCart().items &&
                cartCtx.getCart().items.length > 0 &&
                cartCtx.getCart().items.map((cart) => (
                  <div className={classes.item} key={cart.id}>
                    <button
                      className={classes.cancel}
                      onClick={() => cartCtx.removeItemFromCart(cart.id)}
                    >
                      &times;
                    </button>
                    <p className={classes.title}>{cart.title}</p>

                    <div className={classes.priceContainer}>
                      <div className={classes.qtySelector}>
                        <div
                          className={classes.minusSymbol}
                          onClick={() => cartCtx.reduceCartItem(cart.id)}
                        >
                          -
                        </div>
                        <div className={classes.qty}>{cart.qty}</div>
                        <div
                          className={classes.plusSymbol}
                          onClick={() => cartCtx.increaseCartItem(cart.id)}
                        >
                          +
                        </div>
                      </div>
                      <div className={classes.imageContainer}>
                        <img
                          width={60}
                          height={60}
                          src={cart.image_url}
                          alt={cart.title}
                        />
                      </div>
                      <div className={classes.price}>
                        {cartCtx.getCurrencySymbol() === "USD"
                          ? "$"
                          : cartCtx.getCurrencySymbol() + " "}
                        {(cart.price * cart.qty).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              {cartCtx.getCart().items &&
                cartCtx.getCart().items.length === 0 && (
                  <p style={{ fontSize: "1.2rem" }}>
                    There is no item in your cart
                  </p>
                )}
            </div>
            <hr />
            <div className={classes.totalPlusCheckout}>
              <div>
                {cartCtx.getCart().totalPrice > 0 && (
                  <div className={classes.title}>SUBTOTAL</div>
                )}
                <div className={classes.totalQty}>
                  {cartCtx.getCart().totalPrice > 0 &&
                    (cartCtx.getCurrencySymbol() === "USD"
                      ? "$"
                      : cartCtx.getCurrencySymbol() + " ")}
                  {cartCtx.getCart().totalPrice > 0 &&
                    cartCtx.getCart().totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="checkout"></div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Cart;
