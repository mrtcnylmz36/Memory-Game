import React from "react";
import Level from "./Level";
import { useSelector, useDispatch } from "react-redux";
import { setModal } from "../redux/user/userSlice";

function Modal({ point }) {
  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(setModal(false));
    console.log("sdgds")
  };
  return (
    <div className="modal">
      <div className="modal-inner">
        <h1>Point: {point}</h1>
        <button onClick={onStart}>Restart</button>
      </div>
    </div>
  );
}

export default Modal;
