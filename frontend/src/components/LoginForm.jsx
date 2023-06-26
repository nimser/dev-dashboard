import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./userform.module.css";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const form = useRef(null);
  const { setToken } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form.current));
    fetch(
      `${import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000"}/login`,
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
        if (json.message) {
          setErrors(json);
        } else {
          setToken(json.token);
          navigate("/");
        }
      });
  };
  return (
    <form ref={form} className={styles.form} onSubmit={handleSubmit}>
      <h2>Login</h2>

      {errors.message && <p>{errors.message}</p>}
      <label>
        Username
        <input type="text" name="username" />
      </label>

      <label>
        Password
        <input type="password" name="password" />
      </label>

      <button type="submit">Sign in</button>
    </form>
  );
}
export default LoginForm;
