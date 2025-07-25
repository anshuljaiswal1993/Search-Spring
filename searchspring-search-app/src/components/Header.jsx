import React from "react";

function Header({ theme, toggleTheme }) {
  return (
    <header className="header">
      <div className="logo">SearchSpring</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Header;
