import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "./navbar.module.css";
import { useUser } from "../contexts/UserContext";

export default function NavBar() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/create");
  const { user, setUser } = useUser();
  const handleLogout = async () => {
    setUser(null);
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/logout`);
  };

  return (
    <>
      <nav className={styles.menu}>
        <Link to="/">Home</Link>
        {user == null ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <button type="button" onClick={handleLogout}>
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
