import { useNavigate } from "react-router-dom";

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <div className="container center">
      <div>
        <p className="text-danger h3">
          You are not logged in. Please login first
        </p>
      </div>
      <div>
        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default GoBack;
