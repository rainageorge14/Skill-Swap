import { Link } from "react-router-dom";

function Home() {

  return (

    <div style={styles.container}>

      <div style={styles.overlay}>

        <h1 style={styles.title}>
          Skill Swap Platform
        </h1>

        <p style={styles.subtitle}>
          Connect • Learn • Grow Together
        </p>

        <div style={styles.buttonContainer}>

          <Link to="/login">
            <button style={styles.loginBtn}>
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button style={styles.signupBtn}>
              Signup
            </button>
          </Link>

        </div>

      </div>

    </div>

  );

}

const styles = {

  container: {
    height: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },

  overlay: {
    textAlign: "center"
  },

  title: {
    fontSize: "70px",
    marginBottom: "20px",
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: "24px",
    color: "#cbd5e1",
    marginBottom: "40px"
  },

  buttonContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center"
  },

  loginBtn: {
    padding: "14px 40px",
    border: "none",
    borderRadius: "14px",
    background: "#7c3aed",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },

  signupBtn: {
    padding: "14px 40px",
    border: "none",
    borderRadius: "14px",
    background: "#06b6d4",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  }

};

export default Home;