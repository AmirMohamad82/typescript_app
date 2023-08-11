import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./Pages/App";
import Login from "./Pages/Login";
import Layout from "./Pages/Layout";
import SignUp from "./Pages/SignUp";
import ErrorNotFound from "./Pages/ErrorNotFound";
import Store from "./Store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/index.css";
import RouteGuard from "./Components/RouteGuard/RouteGuard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Error = (message:string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const Warning = (message:string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const Success = (message:string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const Default = (message:string) =>{
  toast(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

const Index = () => {
  return (
    <Provider store={Store}>
      <ToastContainer />
      <div className="main">
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<ErrorNotFound />} />
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/app"
              element={
                <RouteGuard>
                  <App />
                </RouteGuard>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default Index;

ReactDOM.render(<Index />, document.getElementById("root"));
