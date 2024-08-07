import React from "react";
function Menu(props) {
  return (
    <aside className="left-sidebar mt-3" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              {" "}
              <a className="sidebar-link" href="/">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Trang chính</span>
              </a>
            </li>

            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Quản lý kinh doanh</span>
            </li>

            <li className="sidebar-item">
              <a href="/users" className="sidebar-link">
                <span className="hide-menu">Quản lý khách hàng</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="/products" className="sidebar-link">
                <span className="hide-menu">Quản lý sản phẩm</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="/categories" className="sidebar-link">
                <span className="hide-menu">Bộ sưu tập</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="/type" className="sidebar-link">
                <span className="hide-menu">Loại sản phẩm</span>
              </a>
            </li>
            {/* <li className="sidebar-item">
              <a href="/size" className="sidebar-link">
                <span className="hide-menu">Size</span>
              </a>
            </li> */}
            <li className="sidebar-item">
              <a href="/brand" className="sidebar-link">
                <span className="hide-menu">Nhà cung cấp</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="/coupons" className="sidebar-link">
                <span className="hide-menu">Voucher</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a href="/history" className="sidebar-link">
                <span className="hide-menu">Quản lý đơn hàng</span>
              </a>
            </li>

            <li className="list-divider"></li>
            {/* <li className="sidebar-item">
              {" "}
              <a
                className="sidebar-link nav-link "
                href="#"
                aria-expanded="false"
                onClick={() => {
                  alertify.set("notifier", "position", "top-right");
                  alertify.error("Đã đăng xuất!");
                  setTimeout(function () {
                    sessionStorage.clear();
                    window.location.reload();
                  }, 1200);
                }}
              >
                <i data-feather="lock" className="feather-icon"></i>
                <span className="hide-menu">Đăng xuất</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link nav-link"
                href="authentication-register1.html"
                aria-expanded="false"
              >
                <i data-feather="lock" className="feather-icon"></i>
                <span className="hide-menu">Register</span>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
