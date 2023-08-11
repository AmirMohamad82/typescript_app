import { Outlet } from "react-router-dom";
import Home from "../Components/LayoutPage/Home";
import NavbarHome from "../Components/Navbar/NavbarHome";

const Layout = () => {
  return (
    <>
      <NavbarHome index={1} />
      <Home />
      <Outlet />
    </>
  );
};

export default Layout;
