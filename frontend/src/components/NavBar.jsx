import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function NavBar() {
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/create");

  return (
    <nav>
      <button type="button" onClick={handleOnClick}>
        <FaPlus />
      </button>
    </nav>
  );
}
