import "./App.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";

// connecting this client with socket server
const socket = io.connect("http://localhost:5000", {
  auth: {
    Authorization: "Bearer authorization_token_here",
  },
});

// auto generates random user id
const userId = nanoid(4);

function App() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const onSendMessage = (e) => {
    e.preventDefault();
    if (message) socket.emit("chat", { message, userId });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>#web_development chat</h1>
        {chat.map(({ message, userId }, i) => (
          <p key={i}>
            <span>Id: {userId}</span> : {message}
          </p>
        ))}
        <form onSubmit={onSendMessage}>
          <input
            type="text"
            name="chat"
            placeholder="Enter message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
