import { NavLink } from "react-router-dom";

function Sidebar() {

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  return (

    <div style={styles.sidebar}>

      {/* Logo */}

      <h2 style={styles.logo}>
        SkillSwap
      </h2>

      {/* Dashboard */}

      <NavLink
        to="/dashboard"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive
            ? "#7c3aed"
            : "rgba(255,255,255,0.05)"
        })}
      >
        Dashboard
      </NavLink>

      {/* Browse Users */}

      <NavLink
        to="/browse"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive
            ? "#7c3aed"
            : "rgba(255,255,255,0.05)"
        })}
      >
        Browse Users
      </NavLink>

      {/* Requests */}

      <NavLink
        to="/requests"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive
            ? "#7c3aed"
            : "rgba(255,255,255,0.05)"
        })}
      >
        Requests
      </NavLink>

      {/* Connections */}

      <NavLink
        to="/connections"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive
            ? "#7c3aed"
            : "rgba(255,255,255,0.05)"
        })}
      >
        Connections
      </NavLink>

      {/* Logout */}

      <button
        onClick={handleLogout}
        style={styles.logoutBtn}
      >
        Logout
      </button>

    </div>

  );

}

const styles = {

  sidebar: {
    width: "240px",
    minHeight: "100vh",
    padding: "25px",
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.3)"
  },

  logo: {
    color: "white",
    fontSize: "30px",
    marginBottom: "30px",
    fontWeight: "bold",
    textAlign: "center"
  },

  link: {
    color: "white",
    textDecoration: "none",
    padding: "14px",
    borderRadius: "14px",
    transition: "0.3s",
    fontSize: "15px",
    fontWeight: "500",
    display: "block"
  },

  logoutBtn: {
    marginTop: "auto",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  }

};

export default Sidebar;