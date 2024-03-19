import React from "react";
import SalesSmallScreen from "./SalesSmallScreen";

const Sales = ({ previousRecords }) => {
  console.log(previousRecords);
  return (
    <>
      {previousRecords.map((record) => {
        return (
          <div key={record.id}>
            <div className="foodsSold__info">
              <div className="foodStatistics ">
                <div className="foodStatistics__name">{record.food}</div>
                <div className="foodStatistics__premeasuredQuantity">
                  {record.tquantity}
                </div>
                <div className="foodStatistics__Deficiet">{record.tamount}</div>
                <div className="foodStatistics__GottenAmount"></div>
              </div>
            </div>
            <SalesSmallScreen record={record} />
          </div>
        );
      })}
    </>
  );
};

export default Sales;
