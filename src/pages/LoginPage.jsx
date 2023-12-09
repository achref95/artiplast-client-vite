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

    setIsLoadingLogin(true);

    try {
      const response = await authMethods.login(user);
      
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
  
  if (isLoggedIn) {
    return <div>You're already logged in, go to <Link to="/"><strong>Home Page</strong></Link></div>;
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
            <p className="text-sm text-gray-500 mb-4">
              This is a demo app. Due to the server being hosted on a free service, it can take up to 30 seconds for the server to boot up.
            </p>
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
