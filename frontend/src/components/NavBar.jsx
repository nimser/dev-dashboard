import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import styles from "./navbar.module.css";

export default function NavBar() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/create");

  return (
    <>
      <nav className={styles.menu}>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>
      <nav className={styles.actions}>
        <button type="button" onClick={handleOnClick}>
          <FaPlus />
        </button>
      </nav>
    </>
  );
}
