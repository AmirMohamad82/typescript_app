import { FaUserAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { PiEnvelopeBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { Success } from "../..";

const User = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleCollapse = () => setIsOpen(!isOpen);

  const logout = () => {
    Success("You have successfully logged out")
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div style={{ backgroundColor: "#74A1F2" }}>
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <span className="navbar-brand">Tasks Manager</span>
            </div>
            <div className="navbar-header fluid-end">
              <FaUserAlt
                style={{ fontSize: "20px", cursor: "pointer" }}
                title="Profile"
                onClick={toggleCollapse}
              />
            </div>
          </div>
        </nav>
      </div>
      <div className={`collapse ${isOpen ? "show" : ""}`}>
        <div className="shadow p-3 mb-3 bg-white rounded">
          <p>
            <PiEnvelopeBold style={{ fontSize: "20px" }} />{" "}
            {window.localStorage.getItem("email")}
            <GoSignOut
              style={{
                color: "red",
                cursor: "pointer",
                fontSize: "20px",
                float: "right",
              }}
              title="Log out"
              data-bs-toggle="modal"
              data-bs-target="#logout"
            />
          </p>

          <div className="modal fade" id="logout">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <h4 className="mb-3">Are you sure you want to Logout?</h4>
                  <button
                    type="button"
                    className="btn btn-danger col-3 m-2"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    className="btn btn-success col-3 m-2"
                    data-bs-dismiss="modal"
                    onClick={logout}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
