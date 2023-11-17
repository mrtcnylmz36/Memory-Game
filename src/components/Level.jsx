import React, { useState } from "react";
import { useSelector } from "react-redux";

function Level({ onStart }) {
  const userName = useSelector((state) => state.user.userName);
  const isVisible = useSelector((state) => state.user.visible);
  const point = useSelector((state) => state.user.point);
  const [select, setSelect] = useState(null);
  const [className, setClassName] = useState({
    red: "levelItem",
    blue: "levelItem",
    green: "levelItem",
  });
  return (
    <div className="level">
      <h1>Hoş Geldin {userName}</h1>

      <div className="select-container">
        <div
          className={className.red}
          name="red"
          onClick={(e) => {
            setSelect(e.target.innerText);
            setClassName({
              red: "levelItem selected",
              blue: "levelItem",
              green: "levelItem",
            });
          }}
        >
          easy
        </div>
        <div
          className={className.blue}
          name="blue"
          onClick={(e) => {
            setSelect(e.target.innerText);
            setClassName({
              red: "levelItem",
              blue: "levelItem selected",
              green: "levelItem",
            });
          }}
        >
          medium
        </div>
        <div
          className={className.green}
          name="green"
          onClick={(e) => {
            setSelect(e.target.innerText);
            setClassName({
              red: "levelItem",
              blue: "levelItem",
              green: "levelItem selected",
            });
          }}
        >
          hard
        </div>
      </div>
      <button
        onClick={() => {
          if (select) {
            onStart(select);
          }
        }}
      >
        START
      </button>
    </div>
  );
}

export default Level;
