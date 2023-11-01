import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Link to="/" className="navbar bg-neutral text-neutral-content mb-4">
      <div className="btn btn-ghost normal-case text-xl">ARTIPLAST</div>
    </Link>
  );
};

export default Nav;
