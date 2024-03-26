import React from "react";

const Balance = ({value}) => {
  return (
    <div className="flex p-4">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};

export default Balance;
