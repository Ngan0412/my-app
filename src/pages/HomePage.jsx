import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./HomePage.css";  // ✅ import CSS

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", username),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot.docs.map(doc => doc.data()));
      if (!querySnapshot.empty) {
        setUser(username);
        setError("");
      } else {
        setError("Username or password is incorrect");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome</h1>

      {user ? (
        <p className="user">Hello, {user}!</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <br />
          <button onClick={handleLogin}>
            Login
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default HomePage;
