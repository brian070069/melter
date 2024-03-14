import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/qmelter.png";

const HeaderLeft = () => {
  const navigate = useNavigate();
  return (
    <div className="header__left row">
      <div onClick={() => navigate("/")}>
        <img src={Logo} alt="" />
      </div>
    </div>
  );
};

export default HeaderLeft;
