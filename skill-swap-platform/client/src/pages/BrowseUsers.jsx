import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function BrowseUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      setUsers(response.data || []);

      setLoading(false);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch users");

      setLoading(false);

    }

  };

  const sendRequest = async (receiverId) => {

    try {

      const response = await axios.post(
        "http://skill-swap-1-a5b8.onrender.com/api/auth/send-request",
        {
          sender: currentUser.id,
          receiver: receiverId
        }
      );

      toast.success(response.data.message);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Request failed"
      );

    }

  };

  if (loading) {

    return (

      <h1 style={{ color: "white" }}>
        Loading users...
      </h1>

    );

  }

  return (

    <div>

      <h1 style={styles.heading}>
        Browse Users
      </h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={styles.searchInput}
      />

      <div style={styles.grid}>

        {users
          .filter(
            (user) =>
              user._id !== currentUser?.id
          )
          .filter((user) =>
            user.name
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((user) => (

            <div
              key={user._id}
              style={styles.card}
            >

              <div style={styles.avatar}>
                {user.name?.charAt(0)}
              </div>

              <h2 style={styles.name}>
                {user.name}
              </h2>

              <p style={styles.bio}>
                {user.bio || "No bio"}
              </p>

              <p style={styles.skills}>

                <strong>
                  Teaches:
                </strong>

                {" "}

                {Array.isArray(user.skillsOffered)
                  ? user.skillsOffered.join(", ")
                  : "No skills"}

              </p>

              <p style={styles.skills}>

                <strong>
                  Learns:
                </strong>

                {" "}

                {Array.isArray(user.skillsWanted)
                  ? user.skillsWanted.join(", ")
                  : "No skills"}

              </p>

              <button
                style={styles.button}
                onClick={() =>
                  sendRequest(user._id)
                }
              >
                Send Request
              </button>

            </div>

          ))}

      </div>

    </div>

  );

}

const styles = {

  heading: {
    color: "white",
    fontSize: "40px",
    marginBottom: "25px"
  },

  searchInput: {
    width: "100%",
    padding: "15px",
    marginBottom: "30px",
    borderRadius: "14px",
    border: "none",
    background: "#1e293b",
    color: "white",
    fontSize: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "22px",
    color: "white",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.3)"
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right, #7c3aed, #2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px"
  },

  name: {
    marginBottom: "10px"
  },

  bio: {
    color: "#cbd5e1",
    marginBottom: "15px"
  },

  skills: {
    marginBottom: "10px",
    color: "#e2e8f0"
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right, #7c3aed, #2563eb)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600"
  }

};

export default BrowseUsers;