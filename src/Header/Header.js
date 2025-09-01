import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
      <h2>Library Management </h2>
      <img
        className="user-logo"
        src={require("../assets/user-icon.png")}
        alt="user icon"
      ></img>
      </div>
    </div>
  );
}

export default Header;
