import React, { useContext } from "react";
import { useGetCartItems } from "../../hooks/useGetCart";
import AllCartItems from "./AllCartItems";
import BigCartPayments from "./BigCartPayments";
import Header from "../../components/Header";
import CartHeader from "./CartHeader";
import { CartContext } from "../../context/CartContext";
import emptyCart from "../../assets/emptyCart.svg";
import { useMpesaPayment } from "../../hooks/useMpesaPayment";
import ReadyToPay from "../../components/payments/ReadyToPay";
import SuccessfulPayments from "../../components/payments/SuccesfulPayments";
import ProcessingPayments from "../../components/payments/ProcessingPayments";
import FailedPayments from "../../components/payments/FailedPayments";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import HomeLeftLinks from "../Home/components/mobile/HomeLeftLinks";

const Cart = () => {
  useRequireAuth();
  const [state] = useContext(CartContext);
  useGetCartItems();

  const {
    handleMpesaPayment,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    paymentErrorMessages,
    isPaymentSucessful,
    serverErrorMessages,
  } = useMpesaPayment();

  return (
    <div className="big__cartContainer">
      <Header />
      {state.error && <Error message="An error occured" />}
      {state.cartItems.length <= 0 ? (
        <div className="bigCartEmpty">
          <p>Your Cart is Empty</p>
          <div className="bigCart__emptyImageContainer">
            <img src={emptyCart} alt="img" />
          </div>
          <HomeLeftLinks />
        </div>
      ) : (
        <div className="big_cart">
          <div className="big_cartLeft">
            <CartHeader />
            <AllCartItems />
          </div>

          <BigCartPayments props={{ handleDispalyPaymentArea }} />
        </div>
      )}

      {/* ready to pay */}
      <>
        {showPaymentArea && (
          <div className="payments row">
            <div className="paymentContainer">
              {showPhoneNumber && (
                <ReadyToPay
                  data={{
                    handleHidePaymentArea,
                    handleDispalyPaymentArea,
                    handleMpesaPayment,
                  }}
                />
              )}

              {/* processing payments */}
              {isProcessingPayments && (
                <ProcessingPayments
                  processingPayments
                  message={"processing your payments"}
                />
              )}

              {/* payment successful */}
              {isPaymentSucessful && (
                <SuccessfulPayments
                  props={{
                    message: "payment completed succesfully",
                    handleHidePaymentArea,
                  }}
                />
              )}

              {/* failed payments */}
              {isPaymentFailed && (
                <FailedPayments
                  props={{
                    handleHidePaymentArea,
                    paymentErrorMessages,
                    serverErrorMessages,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
