import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function Dashboard() {

  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [user, setUser] = useState(storedUser);

  const [bio, setBio] = useState(
    user.bio || ""
  );

  const [teaches, setTeaches] = useState(
    user.teaches
      ? user.teaches.join(", ")
      : ""
  );

  const [learns, setLearns] = useState(
    user.learns
      ? user.learns.join(", ")
      : ""
  );

  const handleUpdate = async () => {

    try {

      const response = await axios.put(
        `http://skill-swap-1-a5b8.onrender.com/api/auth/update-profile/${user.id}`,
        {
          bio,
          teaches: teaches.split(","),
          learns: learns.split(",")
        }
      );

      setUser(response.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success("Profile Updated");

    } catch (error) {

      toast.error("Update failed");

    }

  };

  return (

    <div>

      {/* TOP SECTION */}

      <div style={styles.hero}>

        <div>

          <h1 style={styles.heading}>
            Welcome back, {user.name} 👋
          </h1>

          <p style={styles.subtext}>
            Continue learning and sharing skills.
          </p>

        </div>

        <div style={styles.avatar}>
          {user.name.charAt(0)}
        </div>

      </div>

      {/* STATS */}

      <div style={styles.statsContainer}>

        <div style={styles.statCard}>
          <h2>{user.teaches?.length || 0}</h2>
          <p>Skills Teaching</p>
        </div>

        <div style={styles.statCard}>
          <h2>{user.learns?.length || 0}</h2>
          <p>Skills Learning</p>
        </div>

        <div style={styles.statCard}>
          <h2>12</h2>
          <p>Connections</p>
        </div>

      </div>

      {/* PROFILE FORM */}

      <div style={styles.formCard}>

        <h2 style={{ marginBottom: "20px" }}>
          Update Profile
        </h2>

        <textarea
          placeholder="Write your bio..."
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          style={styles.textarea}
        />

        <input
          type="text"
          placeholder="Skills you teach"
          value={teaches}
          onChange={(e) =>
            setTeaches(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Skills you want to learn"
          value={learns}
          onChange={(e) =>
            setLearns(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={handleUpdate}
          style={styles.button}
        >
          Save Changes
        </button>

      </div>

      {/* SKILLS */}

      <div style={styles.skillsGrid}>

        <div style={styles.skillCard}>

          <h3 style={styles.cardTitle}>
            Skills I Teach
          </h3>

          <div style={styles.tags}>

            {user.teaches?.map((skill, index) => (

              <span
                key={index}
                style={styles.tag}
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

        <div style={styles.skillCard}>

          <h3 style={styles.cardTitle}>
            Skills I Want
          </h3>

          <div style={styles.tags}>

            {user.learns?.map((skill, index) => (

              <span
                key={index}
                style={{
                  ...styles.tag,
                  background: "#2563eb"
                }}
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

const styles = {

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  heading: {
    color: "white",
    fontSize: "38px"
  },

  subtext: {
    color: "#cbd5e1",
    marginTop: "10px"
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#7c3aed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "30px",
    fontWeight: "bold"
  },

  statsContainer: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },

  statCard: {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    color: "white",
    backdropFilter: "blur(10px)"
  },

  formCard: {
    background: "rgba(255,255,255,0.06)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    marginBottom: "30px"
  },

  textarea: {
    width: "100%",
    height: "120px",
    marginBottom: "20px",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    background: "#1e293b",
    color: "white"
  },

  input: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "12px",
    border: "none",
    background: "#1e293b",
    color: "white"
  },

  button: {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer",
    fontSize: "16px"
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  skillCard: {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    backdropFilter: "blur(10px)"
  },

  cardTitle: {
    color: "white",
    marginBottom: "20px"
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },

  tag: {
    background: "#7c3aed",
    padding: "8px 14px",
    borderRadius: "20px",
    color: "white",
    fontSize: "14px"
  }

};

export default Dashboard;