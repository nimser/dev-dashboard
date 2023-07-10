import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userform.module.css";

function UserForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const form = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/users`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          setUser(json);
        } else {
          navigate("/");
        }
      });
  };
  return (
    <form ref={form} className={styles.form} onSubmit={handleSubmit}>
      <h2>Register</h2>

      <label>
        Username
        <input type="text" name="username" defaultValue={user.username} />
      </label>
      {user.errors?.username && <small>{user.errors.username.message}</small>}

      <label>
        Email
        <input type="email" name="email" defaultValue={user.email} />
      </label>
      {user.errors?.email && <small>{user.errors.email.message}</small>}

      <label>
        Password
        <input type="password" name="password" defaultValue={user.password} />
      </label>
      {user.errors?.password && <small>{user.errors.password.message}</small>}

      <button type="submit">Sign up</button>
    </form>
  );
}
export default UserForm;
