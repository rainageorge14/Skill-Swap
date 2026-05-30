import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Requests() {

  const [requests, setRequests] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/auth/requests/${user.id}`
      );

      setRequests(response.data);

    } catch (error) {

      console.log(error);

      toast.error("Failed to fetch requests");

    }

  };

  const updateStatus = async (
    requestId,
    status
  ) => {

    try {

      await axios.put(
        `http://localhost:5000/api/auth/request-status/${requestId}`,
        { status }
      );

      toast.success(`Request ${status}`);

      fetchRequests();

    } catch (error) {

      console.log(error);

      toast.error("Update failed");

    }

  };

  return (

    <div>

      <h1 style={styles.heading}>
        Requests
      </h1>

      {requests.length === 0 ? (

        <div style={styles.emptyBox}>

          <h2>No Requests Yet 📭</h2>

          <p>
            Start connecting with developers.
          </p>

        </div>

      ) : (

        <div style={styles.grid}>

          {requests.map((request) => (

            <div
              key={request._id}
              style={styles.card}
            >

              <h2>
                {request.sender?.name}
              </h2>

              <p>
                {request.sender?.skillsOffered}
              </p>

              <p>
                Wants:
                {" "}
                {request.sender?.skillsWanted}
              </p>

              <p>
                Status:
                {" "}
                {request.status}
              </p>

              {request.status === "pending" && (

                <div style={styles.btnContainer}>

                  <button
                    style={styles.acceptBtn}
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "accepted"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    style={styles.rejectBtn}
                    onClick={() =>
                      updateStatus(
                        request._id,
                        "rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

const styles = {

  heading: {
    color: "white",
    marginBottom: "30px",
    fontSize: "36px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "20px",
    color: "white",
    backdropFilter: "blur(12px)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.3)"
  },

  btnContainer: {
    display: "flex",
    gap: "10px",
    marginTop: "20px"
  },

  acceptBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#22c55e",
    color: "white",
    cursor: "pointer"
  },

  rejectBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer"
  },

  emptyBox: {
    textAlign: "center",
    marginTop: "80px",
    color: "#cbd5e1"
  }

};

export default Requests;