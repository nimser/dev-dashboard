import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "./navbar.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/create");
  const { token, setToken } = useAuth();

  return (
    <>
      <nav className={styles.menu}>
        <Link to="/">Home</Link>
        {token == null ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button type="button" onClick={() => setToken(null)}>
            Logout
          </button>
        )}
      </nav>
      <nav className={styles.actions}>
        <button type="button" onClick={handleOnClick}>
          <FaPlus />
        </button>
      </nav>
    </>
  );
}
