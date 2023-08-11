import { Outlet, Link, useNavigate } from "react-router-dom";
import NavbarHome from "../Components/Navbar/NavbarHome";
import { fetchLogin } from "../Features/FeatureLogin/LoginSlice";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "./../Store/hook";
import { Error } from "..";

interface UserType {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [User, setUser] = useState<UserType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [type, setType] = useState<string>("password");
  const [eye, setEye] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/app");
    }
  }, [navigate]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      fetchLogin({
        User,
        success: () => {
          navigate("/app");
        },
        fail: (error) => {
          Error(error);
        },
      })
    );
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const toggleEye = () => {
    if (type === "password") {
      setType("text");
      setEye(true);
    } else {
      setType("password");
      setEye(false);
    }
  };

  return (
    <>
      <NavbarHome index={2} />
      <div className="container mt-5">
        <p className="h1 mb-3 col-12 text-center">Welcome</p>
        <form onSubmit={onSubmit}>
          <div className="form-group input-group">
            <input
              type="email"
              className="form-control m-2 rounded-3"
              placeholder="Email"
              name="email"
              required
              onChange={change}
            />
          </div>
          <div className="form-group input-group">
            <input
              type={type}
              className="form-control m-2 me-0 rounded-3 rounded-end-0"
              placeholder="Password"
              name="password"
              required
              onChange={change}
            />
            <button
              className="btn btn-secondary m-2 rounded-3 ms-0 rounded-start-0"
              type="button"
              onClick={toggleEye}
            >
              {eye ? (
                <HiEyeOff style={{ fontSize: "20px" }} />
              ) : (
                <HiEye style={{ fontSize: "20px" }} />
              )}
            </button>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Login"
              className="btn btn-success m-2 rounded-3"
            />

            <Link to="/">
              <button className="btn btn-danger m-2 rounded-3">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
      <Outlet />
    </>
  );
};

export default Login;
