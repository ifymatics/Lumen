import { createContext, useState, useEffect } from "react";
import { useQuery, PRODUCTS, CURRENCY } from "../graphQL/GraphqlProvider";

export const CartContext = createContext({
  cart: [],
  addToCart: (item) => {},

  getCart: () => {},
  getCurrency: () => {},
  selectCurrency: (curr) => {},
  getProducts: () => {},
  getCurrencySymbol: () => {},
  reduceCartItem: (id) => {},
  increaseCartItem: (id) => {},
  removeItemFromCart: (item) => {},
});

const CartContextProvider = (props) => {
  const [currency, setCurrency] = useState("USD");
  const [cart, setCart] = useState({ totalQty: 0, totalPrice: 0, items: [] });

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useQuery(PRODUCTS, {
    variables: { currency },
  });

  const {
    loading: currencyLoading,
    error: currencyError,
    data: currencyData,
  } = useQuery(CURRENCY);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    if (productsData) {
      (() => {
        if (cart.items.length > 0) {
          const cartCopy = { ...cart };
          cartCopy.totalPrice = 0;
          cartCopy.items &&
            cartCopy.items.map((cart, cartIndex) =>
              productsData.products.forEach((prod) => {
                if (prod.id === cart.id) {
                  cartCopy.items[cartIndex].price = prod.price;
                  cartCopy.totalPrice += prod.price * cart.qty;
                }
              })
            );

          setCart(cartCopy);
          localStorage.setItem("cart", JSON.stringify(cartCopy));
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsData]);

  //cart ={items:[{id:'1',Ttitle, image_url,price,qty}],totalQty,totalPrice}

  const getCurrency = () => {
    return { currencyLoading, currencyError, currencyData };
    // setCurrency(curr);
  };

  const getProducts = () => {
    return { productsLoading, productsError, productsData };
  };
  const selectCurrency = (curr) => {
    setCurrency(curr);
  };

  const getCurrencySymbol = () => {
    return currency;
  };
  const addToCart = (item) => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const foundItem = parsedCart?.items?.find((prod) => prod.id === item.id);

      if (foundItem) {
        const itemIndex = parsedCart.items.findIndex(
          (cartItem) => cartItem.id === foundItem.id
        );
        if (itemIndex !== -1) {
          parsedCart.items[itemIndex].qty++;
          parsedCart.totalQty++;
          parsedCart.totalPrice += parsedCart.items[itemIndex].price;
          setCart(parsedCart);
          localStorage.setItem("cart", JSON.stringify(parsedCart));
        }
      } else {
        const newItem = { ...item, qty: 1 };
        parsedCart.items = [...parsedCart.items, newItem];
        parsedCart.totalQty += 1;
        parsedCart.totalPrice += item.price;
        setCart(parsedCart);
        localStorage.setItem("cart", JSON.stringify(parsedCart));
      }
    } else {
      const newCart = {
        items: [{ ...item, qty: 1 }],
        totalQty: 1,
        totalPrice: item.price,
      };
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };
  const getCart = () => {
    return cart;
  };
  //   console.log(getCart());
  const removeItemFromCart = (id) => {
    const cartCopy = { ...cart };
    const itemIndex = cartCopy.items.findIndex((prod) => prod.id === id);
    if (itemIndex !== -1) {
      cartCopy.totalQty -= cartCopy.items[itemIndex].qty;
      cartCopy.totalPrice -=
        cartCopy.items[itemIndex].qty * cartCopy.items[itemIndex].price;
      cartCopy.items.splice(itemIndex, 1);
      console.log(cartCopy);
      setCart(cartCopy);
      localStorage.setItem("cart", JSON.stringify(cartCopy));
    }
  };
  const reduceCartItem = (id) => {
    const cartCopy = { ...cart };
    const itemIndex = cartCopy.items.findIndex((prod) => prod.id === id);
    if (itemIndex !== -1) {
      if (cartCopy.items[itemIndex].qty > 1) {
        cartCopy.items[itemIndex].qty -= 1;
        cartCopy.totalQty -= 1;
        cartCopy.totalPrice -= cartCopy.items[itemIndex].price;

        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy));
      } else {
        cartCopy.totalQty -= 1;
        cartCopy.totalPrice -= cartCopy.items[itemIndex].price;
        cartCopy.items.splice(itemIndex, 1);

        setCart(cartCopy);
        localStorage.setItem("cart", JSON.stringify(cartCopy));
      }
    }
  };
  const increaseCartItem = (id) => {
    const cartCopy = { ...cart };
    const itemIndex = cartCopy.items.findIndex((prod) => prod.id === id);
    if (itemIndex !== -1) {
      cartCopy.items[itemIndex].qty += 1;
      cartCopy.totalQty += 1;
      cartCopy.totalPrice += cartCopy.items[itemIndex].price;
      setCart(cartCopy);
      localStorage.setItem("cart", JSON.stringify(cartCopy));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        reduceCartItem,
        increaseCartItem,
        removeItemFromCart,
        getCart,
        getCurrency,
        getProducts,
        selectCurrency,
        getCurrencySymbol,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
