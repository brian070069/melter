import React from "react";
import { RxCross2 } from "react-icons/rx";

const QrCodeImage = ({ setShowQrCodeArea, qrCodeImage }) => {
  return (
    <div className="">
      <div className="max-w-[250px] h-[250px] mx-auto my-[100px] ">
        <div className="flex justify-end">
          <button
            onClick={() => setShowQrCodeArea(false)}
            className="flex  justify-center py-3 items-center  text-red-600   rounded-full w-[50px] h-[50px]"
          >
            <RxCross2 size={26} />
          </button>
        </div>
        {qrCodeImage ? (
          <div className="">
            <img src={qrCodeImage} alt="qrcode" />
          </div>
        ) : (
          <div className="flex flex-col text-lg justify-center items-center h-full border-solid border-[1px] border-white">
            
            <div>Qrcode was Scanned,</div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeImage;
