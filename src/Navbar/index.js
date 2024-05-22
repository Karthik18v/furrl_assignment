import { useState, useEffect } from "react";

import "./index.css";

const Navbar = () => {
  const onClickHomeLogo = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      const navbarEl = document.getElementById("navbar");
      let scrollTop = window.scrollY;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbarEl.style.top = "-100px";
      } else {
        navbarEl.style.top = "0";
      }
      lastScrollTop = scrollTop;
    });

    return window.removeEventListener("scroll", () => {});
  });

  return (
    <div className="nav-bar-container" id="navbar">
      <img
        onClick={onClickHomeLogo}
        className="website-logo"
        src="https://i.imghippo.com/files/wIlC51716354177.jpg"
        alt="website logo"
      />
      <div className="nav-logo-container">
        <a href="https://furrl.in/wishlist">
          <img
            className="nav-icon"
            src="https://i.imghippo.com/files/b8phK1716354378.jpg"
            alt="wishlist"
          />
        </a>
        <a href="https://furrl.in/cart">
          <img
            className="nav-icon"
            src="https://i.imghippo.com/files/WMvZP1716354326.jpg"
            alt="cart"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
