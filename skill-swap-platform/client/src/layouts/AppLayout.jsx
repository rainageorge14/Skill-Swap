import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AppLayout() {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    background: "linear-gradient(to right, #0f172a, #1e1b4b)"
  },
  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto"
  }
};

export default AppLayout;