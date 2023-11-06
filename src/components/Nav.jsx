import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Nav = () => {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between bg-neutral text-neutral-content p-4">
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        ARTIPLAST
      </Link>
      {isLoggedIn && (
        <button
          onClick={() => {
            logOutUser();
            navigate("/");
          }}
          className="btn btn-error"
        >
          Log out
        </button>
      )}
    </div>
  );
};

export default Nav;