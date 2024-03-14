import { useFormik } from "formik";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import InLineInputError from "./InLineInputError";
import { userUrl } from "../services/BaseUrls";
import axios from "axios";
import { getToken } from "../libs/getToken";
import * as yup from "yup";
import { Toast } from "../services/ToasterProvider";

const passwordValidationShema = yup.object({
  password: yup.string().required("required"),
});

const QrCodePassword = ({ handleShowQrCode, setShowQrCodeArea }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: passwordValidationShema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const token = getToken("token");

      if (!token) {
        localStorage.clear();
        setIsAuthenticated(false);
        return;
      }

      try {
        await axios.post(
          userUrl + "password_checker/",
          { password: values.password },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        handleShowQrCode();
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error.response.status === 400) {
          Toast.error("Incorrect password");
        } else {
          Toast.error("unkown error occured please try again");
        }

        console.log(error);
      }
    },
  });

  return (
    <div className="">
      <div className="readyToPay max-w-[500px] mx-auto my-28 bg-[#192433]">
        <div className="readyToPay__header row">
          <h4>Enter Your Password </h4>
          <button onClick={() => setShowQrCodeArea(false)}>
            <i>
              <RxCross2 size={20} />
            </i>
          </button>
        </div>
        <div className="inputContainer row">
          <span className="text-[16px]">
            To view your meal qrcode you must enter the password for this
            account for security purposes
          </span>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={values.password}
            onChange={handleChange}
            errors={errors.password}
            className={errors.password && touched.password ? "border__red" : ""}
          />
          {errors.password && (
            <InLineInputError
              touched={touched.password}
              errors={errors.password}
            />
          )}
        </div>

        <div className="flex justify-around py-3">
          <button
            onClick={() => setShowQrCodeArea(false)}
            className="bg-[#fed800] py-2 px-4 rounded-md w-[90px]"
          >
            cancel
          </button>
          <button
            disabled={isLoading}
            type="button"
            className={`text-black bg-[#fed800] py-2 px-4 rounded-md  w-[90px] ${
              isLoading && "bg-gray-700 text-white w-fit"
            }`}
            onClick={handleSubmit}
          >
            {isLoading ? "verifying..." : "view"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCodePassword;
