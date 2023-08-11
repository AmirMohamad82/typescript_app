import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

interface IndexType {
  index: number;
}

const NavbarHome = ({ index }: IndexType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-secondary m-3 rounded-5">
      <div className="container-fluid">
        <div className="navbar-header">
          <span className="navbar-brand h1">Tasks Manager</span>
        </div>
        <div className="navbar-brand">
          <button
            className="navbar-toggler btn btn-default float-end"
            onClick={toggleCollapse}
          >
            <FiMenu style={{ fontSize: "30px" }} />
          </button>
        </div>
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item p-2">
              <Link to="/">
                <button
                  className={
                    index === 1
                      ? "text-white btn btn-secondary active"
                      : "text-white btn btn-secondary"
                  }
                >
                  Home
                </button>
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to="/login">
                <button
                  className={
                    index === 2
                      ? "text-white btn btn-secondary active"
                      : "text-white btn btn-secondary"
                  }
                >
                  Login
                </button>
              </Link>
            </li>
            <li className="nav-item p-2">
              <Link to="/signup">
                <button
                  className={
                    index === 3
                      ? "text-white btn btn-secondary active"
                      : "text-white btn btn-secondary"
                  }
                >
                  Sign Up
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
};

export default NavbarHome;
