import { useContext } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartContext } from "../../contextApi/CartContext";

import classes from "./NavBar.module.scss";

const NavBar = ({ setShow }) => {
  const handleViewCart = () => {
    setShow(true);
  };
  const cartCtx = useContext(CartContext);

  return (
    <div className={classes.navBar}>
      <div className={classes.left}>
        <div className={classes.home}>
          <h1 style={{ letterSpacing: "5px", fontWeight: 400 }}>
            <a href="/home">LUMIN</a>
          </h1>
        </div>
        <div>
          <h3>
            <a href="/shop">Shop</a>
          </h3>
        </div>
        <div>
          <h3>
            <a href="/learn">Learn</a>
          </h3>
        </div>
      </div>
      <div className={classes.right}>
        <div>
          <a href="/account">Account</a>
        </div>
        <div>
          <div onClick={handleViewCart}>
            <Badge badgeContent={cartCtx.getCart().totalQty} color="primary">
              <ShoppingCartOutlinedIcon
                className={classes.shoppingCart}
                style={{ marginRight: "0px", fontSize: "2rem" }}
              />
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
