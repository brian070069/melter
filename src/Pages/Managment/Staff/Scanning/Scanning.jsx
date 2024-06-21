import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "../../../../services/ToasterProvider";
import { cartBaseUrl } from "../../../../services/BaseUrls";;
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";

const Scanning = () => {
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [scannedDetails, setScannedDetails] = useState({});
  const inputRef = useRef(null);

  const handleScanning = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        cartBaseUrl + `orderd-food/${orderId.toLocaleLowerCase()}/`
      );
      const data = response.data;
      setIsLoading(false);
      setScannedDetails(data);
      Toast.success("QrCode scanned successfully");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error?.request?.status === 404) {
        toast.error("fake QrCode or already scanned");
      } else {
        toast.error("Unkown error occured,Please try again");
      }
    }
  };

  useEffect(() => {
    if (orderId.length >= 36) {
      handleScanning();
      setOrderId("");
      return;
    }
    inputRef.current.focus();
  }, [orderId]);

  return (
    <div>
      <div className="mt-5 mx-48">
        <input
          ref={inputRef}
          type="text"
          placeholder="orderId..."
          value={orderId}
          onChange={(e) => {
            setOrderId(e.target.value);
          }}
        />
      </div>
      <div className="">
        {isLoading ? (
          <div className="flex flex-col items-center  gap-2 h-[50vh] mt-20 text-white text-bold">
            <TailSpin
              height="60"
              width="60"
              color="red"
              ariaLabel="tail-spin-loading"
              radius="0.7"
              wrapperStyle={{ paddingLeft: "20px" }}
              wrapperClass=""
              visible={true}
            />
            <span className="text-2xl capitalize">fetching data...</span>
          </div>
        ) : Object.keys(scannedDetails).length > 0 ? (
          <div>
            <div className="flex justify-between px-5 pt-5 border-b-[1px] border-b-gray-600 pb-2 mx-14">
              <h4 className="capitalize text-[#27bb27] text-lg font-medium tracking-wider">
                <span> {scannedDetails?.user?.phone_number}</span>
              </h4>
              <div className="flex justify-between capitalize gap-2 text-lg font-medium text-[#fed800]">
                <h4>{scannedDetails?.user?.first_name}</h4>
                <h4>{scannedDetails?.user?.last_name}</h4>
              </div>
            </div>
            <div className="pt-5">
              <div className="grid grid-cols-3 justify-between text-white text-xl tracking-wide">
                <h4 className="text-center text-[#27bb27]">Food Name</h4>
                <h4 className="text-center text-[#fed800] ">Quantity</h4>
                <h4 className="text-center text-red-500">Price</h4>
              </div>
              {scannedDetails?.ordered_food?.map((food, index) => {
                return (
                  <div key={index} className="pt-4 font-semibold">
                    <div className="grid grid-cols-3 justify-between text-white text-xl">
                      <h4 className="text-center capitalize text-[#27bb27] ">
                        {food?.food?.food_name}
                      </h4>
                      <h4 className="text-center text-[#fed800]">
                        {food?.quantity}
                      </h4>
                      <h4 className="text-center text-red-500">
                        {food?.sub_total}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex justify-center h-[50vh] mt-20 text-white text-bold">
            <h4 className="text-2xl">Nothing Scanned Yet...</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanning;
