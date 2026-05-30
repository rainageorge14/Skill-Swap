import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useParams
} from "react-router-dom";

import toast from "react-hot-toast";

function Chat() {

  const { id } = useParams();

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  useEffect(() => {

    fetchMessages();

  }, []);

  const fetchMessages = async () => {

    try {

      const response =
        await axios.get(

          `http://localhost:5000/api/auth/messages/${currentUser.id}/${id}`

        );

      setMessages(response.data);

    } catch (error) {

      toast.error(
        "Failed to load messages"
      );

    }

  };

  const sendMessage = async () => {

    if (!text.trim()) return;

    try {

      await axios.post(

        "http://localhost:5000/api/auth/send-message",

        {
          sender: currentUser.id,
          receiver: id,
          text
        }

      );

      setText("");

      fetchMessages();

    } catch (error) {

      toast.error(
        "Failed to send message"
      );

    }

  };

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        Chat
      </h1>

      <div style={styles.chatBox}>

        {messages.map((msg) => (

          <div

            key={msg._id}

            style={

              msg.sender ===
              currentUser.id

                ? styles.myMessage

                : styles.otherMessage

            }

          >
            {msg.text}
          </div>

        ))}

      </div>

      <div style={styles.inputArea}>

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={sendMessage}
          style={styles.button}
        >
          Send
        </button>

      </div>

    </div>

  );

}

const styles = {

  container: {
    color: "white"
  },

  heading: {
    marginBottom: "20px"
  },

  chatBox: {
    height: "70vh",
    overflowY: "auto",
    background:
      "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px"
  },

  myMessage: {
    background: "#7c3aed",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "60%",
    marginLeft: "auto"
  },

  otherMessage: {
    background: "#1e293b",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "60%"
  },

  inputArea: {
    display: "flex",
    gap: "10px"
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border: "none"
  },

  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background: "#7c3aed",
    color: "white",
    cursor: "pointer"
  }

};

export default Chat;