import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authMethods from "../services/auth.service";
import { AuthContext } from "../context/auth.context";


const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await authMethods.signup(user)
        navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-error">Loading...</span>
    );
  }

  if (!isLoggedIn) {
    return (
      <div data-theme="cmyk" className="hero min-h-screen">
        <div className="card w-full max-w-sm">
          {/* Up for a change */}
          <Link to="/">
            <div className="flex flex-row justify-center gap-x-4 items-center mb-2">
              <h1 className="text-6xl font-bold">Artiplast</h1>
            </div>
          </Link>
          <div className="card-body">
            <h1 className="text-3xl">Sign up</h1>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>


              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Sign up
                </button>
                <div className="divider my-8">Already sign up?</div>
                <Link to="/login">
                  <button className="btn btn-outline w-full">Log in</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};
export default SignUp;
