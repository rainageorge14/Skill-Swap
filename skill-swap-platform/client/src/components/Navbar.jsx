import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>SkillSwap</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/browse-users">Browse Users</Link> 
      </div>

    </nav>
  );
}

export default Navbar;