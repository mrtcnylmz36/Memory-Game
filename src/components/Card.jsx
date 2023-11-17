import React from "react";

function Card({ item, handleClick, index, animation }) {
  return (
    <div
      className={`flip-card ${item.status}`}
      onClick={() => handleClick(index)}
    >
      <div className={`flip-card-inner ${animation}`}>
        <div className="flip-card-front">
          <h1>?</h1>
        </div>
        <div className="flip-card-back">
          <img src={item.img} alt="Avatar" />
        </div>
      </div>
    </div>
  );
}

export default Card;
