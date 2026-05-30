import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Connections() {

  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {

    try {

      const response = await axios.get(
        `http://skill-swap-1-a5b8.onrender.com/api/auth/connections/${user.id}`
      );

      setConnections(response.data);

    } catch (error) {

      toast.error("Failed to load connections");

    }

  };

  return (

    <div style={styles.container}>

      <h1>My Connections</h1>

      {
        connections.length === 0 ? (
          <p>No connections yet</p>
        ) : (
          connections.map((connection) => (

            <div key={connection._id} style={styles.card}>

              <h2>{connection.name}</h2>

              <p>{connection.bio}</p>

              <p>
                <strong>Teaches:</strong>{" "}
                {connection.teaches.join(", ")}
              </p>

              <p>
                <strong>Learns:</strong>{" "}
                {connection.learns.join(", ")}
              </p>

              <button
                style={styles.button}
                onClick={() => navigate(`/chat/${connection._id}`)}
              >
                Message
              </button>

            </div>

          ))
        )
      }

    </div>

  );

}

const styles = {

  container: {
    padding: "20px",
    color: "white"
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  button: {
    padding: "10px 20px",
    backgroundColor: "#6366f1",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer"
  }

};

export default Connections;