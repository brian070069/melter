import { useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { Rings } from "react-loader-spinner";
import { PiCookingPot } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import { GoGoal } from "react-icons/go";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import OrderingStatus from "./OrderingStatus";
import QrCodePassword from "../../../components/QrCodePassword";
import QrCodeImage from "../../../components/QrCodeImage";

const SingleOrderDetails = ({ props }) => {
  let {
    created_at,
    scanned_time,
    status,
    total,
    order_id,
    trans_id,
    qr_image,
  } = props;
  console.log(props);

  const [formatedDate, setFormatedDate] = useState("");
  const [formatedDeliveryDate, setFormatedDeliveryDate] = useState("");
  const [formatedDeliveryTime, setFormatedDeliveryTime] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
  const navigate = useNavigate();
  console.log(props);
  useEffect(() => {
    //format time
    if (created_at) {
      let formatedDate = format(new Date(created_at), "yyyy/MM/dd");
      let formatedTime = format(new Date(created_at), "HH:mm");
      setFormatedDate(formatedDate);
      setFormatedTime(formatedTime);
    }
    if (scanned_time) {
      let formatedDate = format(new Date(scanned_time), "yyyy/MM/dd");
      let formatedTime = format(new Date(scanned_time), "HH:mm");
      setFormatedDeliveryDate(formatedDate);
      setFormatedDeliveryTime(formatedTime);
    }
  }, [created_at, scanned_time]);

  const [showQrCodeArea, setShowQrCodeArea] = useState(false);
  const [showQrCodePasswordModal, setShowQrCodePasswordModal] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // show password area
  const handleShowQrCodePasswordModal = () => {
    setShowQrCode(false);
    setShowQrCodeArea(true);
    setShowQrCodePasswordModal(true);
  };

  // hide password Area
  const handleShowQrCode = () => {
    setShowQrCode(true);
    setShowQrCode(true);
    setShowQrCodePasswordModal(false);
  };

  return (
    <div className="order__details">
      <div className="order__detailsHeader">
        <div className="order__idContainer row ">
          <button className="row" onClick={() => navigate(-1)}>
            <i>
              <HiArrowSmallLeft />
            </i>
          </button>
          <h4 className="orderId">
            Order Id:<span>{order_id?.toUpperCase() || order_id}</span>
          </h4>
        </div>
        <div className="date__transId row">
          <h4>
            Purchased : {formatedDate} {formatedTime} hrs
          </h4>
        </div>
        {status === "p" && (
          <div className="date__transId row">
            <h4>
              scanned:{formatedDeliveryDate} {formatedDeliveryTime} hrs
            </h4>
          </div>
        )}

        <div className="order__detailsStatusContainer row">
          <div className=" row">
            <span className="before">Amount:</span>
            <span className="order__TotalPrice">sh {total}</span>
          </div>
          {trans_id && (
            <div className="row">
              <span className="before">TransId:</span>
              <span className="order__TotalPrice">{trans_id}</span>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleShowQrCodePasswordModal}
            className="bg-[#fed800] text-black py-1 px-4 rounded-md mb-4"
          >
            View QrCode
          </button>

          {showQrCodeArea && (
            <div className="payments px-4">
              {showQrCodePasswordModal && (
                <QrCodePassword
                  handleShowQrCode={handleShowQrCode}
                  setShowQrCodeArea={setShowQrCodeArea}
                />
              )}
              {showQrCode && (
                <QrCodeImage
                  setShowQrCodeArea={setShowQrCodeArea}
                  qrCodeImage={qr_image}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
