import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserName, setLevel, setVisible } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Level from "../components/Level";

function Login() {
  const [name, setName] = useState("");
  const visible = useSelector((state) => state.user.visible);
  // const [visible, setVisible] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (name !== "") {
      if (name.length < 3 || name.length > 15) {
        alert("Takma ad 3-15 karakter olmalı");
      } else {
        dispatch(setUserName(name));
        dispatch(setVisible("level"));
      }
    } else {
      alert("Takma Ad Boş Geçilemez");
    }
  };

  const onStart = (select) => {
    dispatch(setLevel(select));
    navigate("/game");
  };

  return (
    <>
      {visible === "login" ? (
        <div className="login">
          <h1>Takma Ad </h1>
          <input
            type="text"
            placeholder="Takma ad giriniz..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleClick}>İleri</button>
        </div>
      ) : (
        <Level onStart={onStart} />
      )}
    </>
  );
}

export default Login;
