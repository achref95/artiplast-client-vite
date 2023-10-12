import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authMethods from "../services/auth.service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { storeToken, authenticateUser, isLoading, isLoggedIn } = useContext(AuthContext);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };
    console.log(user)

    setIsLoadingLogin(true);

    try {
      const response = await authMethods.login(user);
      console.log(response)
      if (!response?.responseStatus) {
        setError(response?.response?.data.message);
        setIsLoadingLogin(false);
      } else {
        storeToken(response.responseData.authToken);
        authenticateUser();
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setIsLoadingLogin(false);
    }
  };

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-error">Loading...</span>
    );
  }

  return (
    !isLoggedIn && (
      <div data-theme="cmyk" className="hero min-h-screen">
        <div className="card w-full max-w-sm">
          <Link to="/">
            <div className="flex flex-row justify-center gap-x-4 items-center mb-2">
              <h1 className="text-6xl font-bold">Artiplast</h1>
            </div>
          </Link>
          <div className="card-body">
            <h1 className="text-3xl">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={handleUsername}
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
                  value={password}
                  onChange={handlePassword}
                />
              </div>

              {error && <div className="text-error mt-4">{error}</div>}
              <div className="form-control mt-6">
                {isLoadingLogin ? (
                  <button className="btn btn-primary" disabled>
                    <span className="loading loading-spinner"></span>
                    Loading
                  </button>
                ) : (
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                )}
                <div className="divider my-8">Not yet sign up?</div>
                <Link to="/signup">
                  <button className="btn btn-outline w-full">Sign up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginPage;
