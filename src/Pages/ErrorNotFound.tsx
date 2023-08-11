import styled from "../Style/Error.module.css";
import { Outlet, Link } from "react-router-dom";

const ErrorNotFound = () => {
  return (
    <div className={styled.backGround}>
      <div className={styled.section}>
        <h1 className={styled.error}>404</h1>
        <div className={styled.page}>
          Ooops!!! The page you are looking for is not found
        </div>
        <Link to="/" className={styled.backHome}>
          Back to home
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default ErrorNotFound;
