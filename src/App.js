import './App.css';
import { useEffect, useState} from 'react';
import { io } from "socket.io-client";

// Connect server socket
const socket = io.connect("http://localhost:3001")

function App() {
  // Room State
  const [room, setRoom] = useState("");

  const [msg, setMsg] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", {message: msg, room})
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <h1>WS Tuts</h1>

      <input
        type="text"
        placeholder="Room Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
<br />
      <input
        type="text"
        placeholder="Message.."
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>

      <h2>Message: </h2>
      <p>{messageReceived}</p>
    </div>
  );
}

export default App;
