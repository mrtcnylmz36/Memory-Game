import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Cards from "../components/Cards";
import Modal from "../components/Modal";

function Game() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.user.modal);
  const userName = useSelector((state) => state.user.userName);
  const level = useSelector((state) => state.user.level);
  if (userName.length == 0) {
    return <Navigate to="/" />;
  }
  return (
    <div className="game">
      <Cards level={level} />
    </div>
  );
}

export default Game;
