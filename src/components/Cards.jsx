import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import { easy, medium, hard } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  finishGames,
  setVisible,
  setPoint,
  setModal,
} from "../redux/user/userSlice";
import Modal from "../components/Modal";

function Cards({ level }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let dataSort;

  switch (level) {
    case "easy":
      dataSort = easy.sort(() => Math.random() - 0.5);
      break;
    case "medium":
      dataSort = medium.sort(() => Math.random() - 0.5);
      break;
    case "hard":
      dataSort = hard.sort(() => Math.random() - 0.5);
      break;
  }

  const [items, setItems] = useState(dataSort);
  const [disabled, setDisabled] = useState(false);
  const [point, setPoint] = useState(100);
  const [animation, setAnimation] = useState("");
  const [gameStart, setGameStart] = useState(false);
  const [visibleModa, setVisibleModal] = useState(false);
  const previousIndex = useRef(-1);

  const matchCheck = (currentIndex) => {
    if (items[currentIndex].id == items[previousIndex.current].id) {
      items[currentIndex].status = "active matched";
      items[previousIndex.current].status = "active matched";
      setItems([...items]);
      setPoint(point + 50);
      previousIndex.current = -1;
    } else {
      items[currentIndex].status = "active unmatch";
      items[previousIndex.current].status = "active unmatch";
      setItems([...items]);
      setPoint(point - 10);
      let previous = previousIndex.current;
      previousIndex.current = -1;
      setTimeout(() => {
        items[currentIndex].status = "";
        items[previous].status = "";
        setItems([...items]);
      }, 500);
    }
  };

  const handleClick = (index) => {
    if (gameStart) {
      if (index !== previousIndex.current) {
        if (items[index].status === "active matched") {
          alert("already selected");
        } else {
          if (previousIndex.current == -1) {
            previousIndex.current = index;
            items[index].status = "active";
            setItems([...items]);
          } else {
            matchCheck(index);
            // previousIndex.current = -1;
          }
        }
      } else {
        alert("card already selected");
      }
    }
  };

  // Start
  function startGame() {
    if (animation === "animation") {
      setAnimation("");
      setTimeout(() => {
        setAnimation("animation");
      }, 100);
    } else {
      setAnimation("animation");
    }
    setGameStart(true);
    setDisabled(true);
  }

  // Restart

  function reStart() {
    if (animation === "animation") {
      setAnimation("");
      setTimeout(() => {
        setAnimation("animation");
      }, 100);
    } else {
      setAnimation("animation");
    }
    items.forEach((item) => (item.status = ""));
    previousIndex.current = -1;
    setItems(items.sort(() => Math.random() - 0.5));
    setGameStart(true);
    setVisibleModal(false);
    dispatch(finishGames(100));
    if (select) {
      let dataSort;

      switch (select) {
        case "easy":
          dataSort = easy.sort(() => Math.random() - 0.5);
          break;
        case "medium":
          dataSort = medium.sort(() => Math.random() - 0.5);
          break;
        case "hard":
          dataSort = hard.sort(() => Math.random() - 0.5);
          break;
      }

      dataSort.forEach((item) => (item.status = ""));

      setItems(dataSort);
      dispatch(setPoint(100));
    }
  }

  // Finish Game
  const isFinish = items.every((item) => item.status === "active matched");
  const userName = useSelector((state) => state.user.userName);

  function finishGame() {
    dispatch(setVisible("level"));
  }

  const [select, setSelect] = useState(null);
  const [className, setClassName] = useState({
    red: "levelItem",
    blue: "levelItem",
    green: "levelItem",
  });

  if (isFinish) {
    finishGame();
    return (
      <div className="finish">
        <h2>Tebrikler {userName}</h2>
        <h3>Puan: {point}</h3>
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
        <button onClick={reStart}>RESTART </button>
      </div>
    );
  }

  return (
    <div className="cards">
      <h1>
        Point: <span>{point}</span>
      </h1>
      <div className="container">
        {items.map((item, index) => (
          <Card
            key={index}
            index={index}
            item={item}
            handleClick={handleClick}
            animation={animation}
          />
        ))}
      </div>
      <button onClick={startGame} disabled={disabled}>
        START
      </button>
      <button onClick={reStart}>RESTART </button>
    </div>
  );
}

export default Cards;
