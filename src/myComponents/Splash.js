import React, { useEffect, useState } from "react";

function Splash({ handlePlay }) {
  //  mounted
  useEffect(() => {
    scaleGame();
  }, []);

  function scaleGame() {
    var rootWidth = document.getElementById("root").getBoundingClientRect().width;
    var splashElement = document.querySelector(".splash");
    var splashElementWidth = splashElement.getBoundingClientRect().width;
    var transformScale = rootWidth / splashElementWidth;

    if (transformScale < 1) splashElement.style.transform = "translate(-50%,-50%)" + "scale(" + transformScale + ")";
  }
  return (
    <div className="splash-wrapper">
      <div className="splash">
        <div className="splash__title">
          <img src="images/game-title.png" alt=""></img>
        </div>

        <div className="splash__content">
          <div className="game-rules">
            <div className="game-rules__title">Instructions</div>
            <div className="game-rules__item">
              <div className="game-rules__item-text">Collect all the elixirs</div>
              <div className="game-rules__item-img-wrap">
                <img src="images/elixirs.png" alt=""></img>
              </div>
            </div>
            <div className="game-rules__item">
              <div className="game-rules__item-text">Track how many elixirs left</div>
              <div className="game-rules__item-img-wrap elixir-tracker">
                <img src="images/elixir-tracker.png" alt=""></img>
              </div>
            </div>
            <div className="game-rules__item">
              <div className="game-rules__item-text">Avoid Bombs</div>
              <div className="game-rules__item-img-wrap bomb">
                <img src="images/bomb.png" alt=""></img>
              </div>
            </div>
          </div>

          <div className="game-rules">
            <div className="game-rules__title">Controls</div>
            <div className="game-rules__item">
              <div className="game-rules__item-text">
                Arrows (left, Jump, right)
                <br />A W D
              </div>
              <div className="game-rules__item-img-wrap arrows">
                <img src="images/controls.png" alt=""></img>
              </div>
            </div>
          </div>
        </div>

        <div className="splash-btn" onClick={handlePlay}>
          Play
        </div>
      </div>
    </div>
  );
}

export default Splash;
