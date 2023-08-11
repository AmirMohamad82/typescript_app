import { Link, Outlet, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import NavbarHome from "../Components/Navbar/NavbarHome";
import axios from "axios";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { Error } from "..";

interface SignUpType {
  email: string;
  password: string;
  repeatPassword: string;
}

const SignUp = () => {
  const [signUp, setSignUp] = useState<SignUpType>({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [typeOne, setTypeOne] = useState<string>("password");
  const [typeTwo, setTypeTwo] = useState<string>("password");
  const [eyeOne, setEyeOne] = useState<boolean>(false);
  const [eyeTwo, setEyeTwo] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      navigate("/app");
    }
  }, [navigate]);

  const onSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signUp.password !== signUp.repeatPassword) {
      Error("The password entered does not match its repetition")
      return;
    }

    axios
      .post("http://localhost:4000/register", {
        email: signUp.email,
        password: signUp.password,
      })
      .then((res) => {
        localStorage.setItem("token", `Bearer ${res.data?.accessToken}`);
        localStorage.setItem("id", res.data.user?.id);
        localStorage.setItem("email", res.data.user?.email);
        setSignUp({
          email: "",
          password: "",
          repeatPassword: "",
        });
        navigate("/app");
      })
      .catch((error) => {
        Error(error.response.data)
      });
  };

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <NavbarHome index={3} />
      <div className="container mt-5">
        <p className="mb-3 h2 col-12 text-center">Sign Up</p>
        <p className="m-3 mb-2">
          Please fill in this form to create an account.
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-group input-group">
            <input
              type="email"
              className="form-control m-2 rounded-3"
              placeholder="Email"
              required
              name="email"
              onChange={change}
            />
          </div>
          <div className="form-group input-group">
            <input
              type={typeOne}
              className="form-control m-2 me-0 rounded-3 rounded-end-0"
              placeholder="Password"
              name="password"
              required
              onChange={change}
            />
            <button
              className="btn btn-secondary m-2 rounded-3 ms-0 rounded-start-0"
              type="button"
              onClick={() => {
                if (typeOne === "password") {
                  setTypeOne("text");
                  setEyeOne(true);
                } else {
                  setTypeOne("password");
                  setEyeOne(false);
                }
              }}
            >
              {eyeOne ? (
                <HiEyeOff style={{ fontSize: "20px" }} />
              ) : (
                <HiEye style={{ fontSize: "20px" }} />
              )}
            </button>
          </div>
          <div className="form-group input-group">
            <input
              type={typeTwo}
              className="form-control m-2 me-0 rounded-3 rounded-end-0"
              placeholder="Repeat Password"
              name="repeatPassword"
              required
              onChange={change}
            />
            <button
              className="btn btn-secondary m-2 rounded-3 ms-0 rounded-start-0"
              type="button"
              onClick={() => {
                if (typeTwo === "password") {
                  setTypeTwo("text");
                  setEyeTwo(true);
                } else {
                  setTypeTwo("password");
                  setEyeTwo(false);
                }
              }}
            >
              {eyeTwo ? (
                <HiEyeOff style={{ fontSize: "20px" }} />
              ) : (
                <HiEye style={{ fontSize: "20px" }} />
              )}
            </button>
          </div>
          <p className="m-3">
            By creating an account you agree to our{" "}
            <a href="/#" className="text-primary">
              Terms & Privacy
            </a>
            .
          </p>
          <div className="text-center">
            <input
              type="submit"
              value="Sign Up"
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

export default SignUp;
