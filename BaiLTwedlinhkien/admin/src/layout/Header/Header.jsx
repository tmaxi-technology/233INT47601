import React from "react";
import Logotext from "../../Image/logobnshop.png";
import Dropdown from "react-bootstrap/Dropdown";
function Header(props) {
  const nameAdmin = sessionStorage.getItem("admin");
  const logOut = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  return (
    <header className="topbar" data-navbarbg="skin6">
      <nav className="navbar top-navbar navbar-expand-md">
        <div className="navbar-header" data-logobg="skin6">
          <div
            className="navbar-brand"
            style={{
              display: "flex",
              "text-align": "center",
              "justify-content": "center",
            }}
          >
            <a href="/">
              <span className="logo-text text-align">
                <img
                  style={{
                    width: "140px",
                    height: "110px",
                    // objectFit: "cover",
                    marginTop: "40px",
                  }}
                  src={Logotext}
                  alt="homepage"
                />
              </span>
            </a>
          </div>
        </div>

        <div className="navbar-collapse collapse" id="navbarSupportedContent">
          <ul className="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
          <ul className="navbar-nav float-right">
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  <span className="ml-2 d-none d-lg-inline-block">
                    <span>Hello,</span>{" "}
                    <span className="text-dark">{nameAdmin}</span>{" "}
                    <i data-feather="chevron-down" className="svg-icon"></i>
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={logOut}>Đăng Xuất</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
