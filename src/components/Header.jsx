import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../context/authContext.";
import { CartContext } from "../context/CartContext";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { ACTION } from "../Pages/Home/HomeReducer";
import Logo from "../assets/qmelter.png";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthenticationContext);
  const [, dispatch] = useContext(CartContext);

  const handleBackHome = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      dispatch({ type: ACTION.CLEARCART });
      navigate("/");
    }
  };

  return (
    <section className="simpleHeader row ">
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <button onClick={handleBackHome}>
        <i>
          <RxCross2 />
        </i>
      </button>
    </section>
  );
};

export default Header;
