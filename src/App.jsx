import { useState } from "react";
import "./App.scss";
import Cart from "./components/cart/Cart";

import Home from "./components/home/Home";
import NavBar from "./components/navBar/NavBar";

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <NavBar setShow={setShow} />
      <Home setShow={setShow} />
      {show && <Cart show={show} setShow={setShow} />}
    </div>
  );
}

export default App;
