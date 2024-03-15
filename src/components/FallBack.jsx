import React from "react";
import { Vortex } from "react-loader-spinner";
import Logo from "../assets/qmelter.png";

const FallBack = () => {
  return (
    <div className="fallBack">
      <img src={Logo} alt="Logo" className="w-24" />
      <div className="fallBack__loader ">
        <Vortex
          visible={true}
          height="55"
          width="55"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["green", "green", "green", "green", "green", "green"]}
        />
      </div>
    </div>
  );
};

export default FallBack;
