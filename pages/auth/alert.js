import React from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const alertState = useSelector((state) => state.notificationSlice);

  return (
    <div
      className={alertState.showNoti ? "alert__body translated" : "alert__body"}
    >
      <h1>{alertState.heading}</h1>
      <h4>{alertState.message}</h4>
    </div>
  );
};

export default Alert;