import { useState, useEffect } from "react";

import Menu from "./Menu";
import Ham from "./Ham";

const Header = (props) => {
  const [isX, setIsX] = useState(false);

  useEffect(() => {
    const menu = document.querySelector(".Menu");
    const ham = document.querySelector(".Ham");
    if (menu && ham) {
      if (isX) {
        menu.className = "Menu";
        ham.className = "Ham X";
      } else {
        menu.className = "Menu out-right";
        ham.className = "Ham";
      }
    }
  }, [isX]);

  const switchHam = () => {
    setIsX(!isX);
  };

  if (!props.user) {
    return (
      <header>
        <h1>Tomorrow Land</h1>
      </header>
    );
  } else {
    return (
      <header>
        <h1>Tomorrow Land</h1>
        <Ham setIsX={setIsX} switch={switchHam} />
        <Menu signout={props.signout} deleteAccount={props.deleteAccount} />
      </header>
    );
  }
};

export default Header;
