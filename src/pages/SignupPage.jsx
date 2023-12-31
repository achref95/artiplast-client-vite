import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authMethods from "../services/auth.service";
import { AuthContext } from "../context/auth.context";


const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [signupButton, setSignupButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignupButton(true);
  
    try {
      const response = await authMethods.signup(user);
      const message = response.data.message;
  
      setErrorMessage(message);
  
      if (response.status === 201) {
        setSignupButton(false);
        navigate("/login");
      } else {
        // Handle non-201 status codes if needed
        setSignupButton(false);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setSignupButton(false);
    }
  };
  

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-8">
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
        <div className="text-center mt-8">
          <p className="text-lg font-bold mb-4">Hang Tight!</p>
          <p>Our server is firing up its engines. Due to the cosmic distances in cyberspace, this may take up to a minute. Prepare for launch!</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div data-theme="cmyk" className="hero min-h-screen">
        <div className="card w-full max-w-sm">
          <Link to="/">
            <div className="flex flex-row justify-center gap-x-4 items-center mb-2">
              <h1 className="text-6xl font-bold">Artiplast</h1>
            </div>
          </Link>
          <div className="card-body">
            <h1 className="text-3xl">Sign up</h1>
            <p className="text-sm text-gray-500 mb-4">
              This is a demo app. Due to the server being hosted on a free service, it can take up to 30 seconds for the server to boot up.
            </p>

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

              {errorMessage && <div className="text-error mt-4">{errorMessage}</div>}
              <div className="form-control mt-6">
              {signupButton ? (
                  <button className="btn btn-primary" disabled>
                    <span className="loading loading-spinner"></span>
                    Loading
                  </button>
                ) : (
                  <button className="btn btn-primary" type="submit">
                    Sign Up
                  </button>
                )}
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
