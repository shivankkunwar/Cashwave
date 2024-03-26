import React from "react";
import AppBar from "../component/AppBar";
import Balance from "../component/Balance";
import { Users } from "../component/Users";

const dashboard = () => {
  return (
    <div className="">
      <AppBar />
      <div className="m-8">
        <Balance value="12" />
        <Users />
      </div>
    </div>
  );
};

export default dashboard;
