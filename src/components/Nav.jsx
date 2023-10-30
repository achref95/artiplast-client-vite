import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <Link to="/">
      <div className="navbar bg-neutral text-neutral-content mb-4">
        <a className="btn btn-ghost normal-case text-xl">ARTIPLAST</a>
      </div>
    </Link>
  )
}

export default Nav
