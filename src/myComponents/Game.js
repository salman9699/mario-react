import React, { useEffect, useState } from "react";
import "../styles/game.css";
import Data from "../data.js";
import Player from "../gameComponents/player.js";
import Platform from "../gameComponents/platform.js";
import Coin from "../gameComponents/coin.js";
import Sprite from "../gameComponents/sprite.js";
import Particle from "../gameComponents/particle.js";

function Game() {
  var [myPlayer, setMyPlayer] = useState(() => {
    return null;
  });

  var [myCanvas, setMyCanvas] = useState(() => {
    return null;
  });

  var [gameBg, setGameBg] = useState(() => {
    return null;
  });

  var [animateLoop, setAnimateLoop] = useState(() => {
    return null;
  });

  var [platformObjects, setPlatformObjects] = useState(() => {
    return null;
  });

  var [coinObjects, setCoinObjects] = useState(() => {
    return null;
  });

  var [leftKeyPressed, setLeftKeyPressed] = useState(() => {
    return false;
  });

  var [rightKeyPressed, setRightKeyPressed] = useState(() => {
    return false;
  });

  var [lastKey, setLastKey] = useState(() => {
    return null;
  });

  var [totalCoins, setTotalCoins] = useState(() => {
    return 0;
  });

  var [scores, setScores] = useState(() => {
    return null;
  });

  var [collectCount, setCollectCount] = useState(() => {
    return 0;
  });

  var [bombTouched, setBombTouched] = useState(() => {
    return false;
  });

  var [particleObjects, setParticleObjects] = useState(() => {
    return null;
  });

  var [showReplayScreen, setShowReplayScreen] = useState(() => {
    return false;
  });

  var [showCongScreen, setShowCongScreen] = useState(() => {
    return false;
  });

  var [jumpAudio, setJumpAudio] = useState(() => {
    return new Audio(Data.audios.jump.audioPath);
  });

  var [coinAudio, setCoinAudio] = useState(() => {
    return new Audio(Data.audios.coin.audioPath);
  });

  var [bombAudio, setBombAudio] = useState(() => {
    return new Audio(Data.audios.bomb.audioPath);
  });

  var [bombAudioPlayed, setBombAudioPlayed] = useState(() => {
    return false;
  });
  //  mounted
  useEffect(() => {
    init();
    scaleGame();
  }, []);

  function scaleGame() {
    var rootWidth = document.getElementById("root").getBoundingClientRect().width;
    var wrapperElement = document.querySelector(".wrapper");
    var wrapperElementWidth = wrapperElement.getBoundingClientRect().width;
    var transformScale = rootWidth / wrapperElementWidth;

    if (transformScale < 1) wrapperElement.style.transform = "scale(" + transformScale + ")";
  }

  function init() {
    let canvasElement = document.querySelector(".canvas");
    setMyCanvas((myCanvas = canvasElement));
    setMyPlayer((myPlayer = new Player(myCanvas, Data.runLeft.imagePath, Data.runRight.imagePath, Data.standLeft.imagePath, Data.standRight.imagePath)));

    var platformObjs = [];
    Data.platforms.forEach((platform) => {
      platformObjs.push(new Platform(myCanvas, platform.position.x, platform.position.y, platform.width, platform.height, platform.imagePath));
    });
    setPlatformObjects((platformObjects = platformObjs));

    var coinObjs = [];
    Data.coins.forEach((coin) => {
      if (!coin.isBomb) setTotalCoins(totalCoins++);
      coinObjs.push(new Coin(myCanvas, coin.position.x, coin.position.y, coin.width, coin.height, coin.imagePath, coin.isBomb, coin.color));
    });
    setCoinObjects((coinObjects = coinObjs));

    setGameBg((gameBg = new Sprite(myCanvas, 0, 0, Data.gameBg.imagePath)));

    var tempScores = [];
    for (var i = 0; i < totalCoins; i++) {
      tempScores.push(<div className="score" key={i} id={"score-" + (i + 1)}></div>);
    }
    setScores((scores = tempScores));

    setTimeout(() => {
      var bars = document.querySelectorAll(".score");
      for (let index = 0; index < bars.length; index++) {
        const bar = bars[index];
        bar.style.width = 0;
      }
    }, 50);

    animate();
    addControlEvents();
  }

  function restartGame() {
    //resetting collectCount
    setCollectCount((collectCount = 0));

    //resetting BombTouched
    setBombTouched((bombTouched = false));

    //closing Replay Screen
    setShowReplayScreen(false);

    //closing Congratulation Screen
    setShowCongScreen(false);

    //resetting bombAudio
    setBombAudioPlayed((bombAudioPlayed = false));

    // stopping the loop
    cancelAnimationFrame(animateLoop);

    setPlatformObjects((platformObjects = []));
    setTotalCoins((totalCoins = 0));
    setScores((scores = []));
    setCoinObjects((coinObjects = []));
    setParticleObjects((particleObjects = null));
    setMyPlayer((myPlayer = null));
    setGameBg((gameBg = null));

    setLeftKeyPressed((leftKeyPressed = false));
    setRightKeyPressed((rightKeyPressed = false));
    setLastKey((lastKey = null));

    init();
  }

  function animate() {
    setAnimateLoop((animateLoop = requestAnimationFrame(animate)));

    gameBg.draw();

    myPlayer.update();

    platformHandler();

    coinHandler();

    if (particleObjects) {
      particleObjects.forEach((particleObject) => {
        particleObject.update();
      });
    }

    if (!bombTouched) myPlayer.draw();

    playerSpriteHandler();

    playerMovementHandler();

    checkDeathPitsFall();
  }

  function platformHandler() {
    platformObjects.forEach((platform) => {
      platform.draw();

      // collision detection code for platforms
      if (
        myPlayer.position.y + myPlayer.height <= platform.position.y &&
        myPlayer.position.y + myPlayer.height + myPlayer.velocity.y >= platform.position.y &&
        myPlayer.position.x + myPlayer.width >= platform.position.x + 15 &&
        myPlayer.position.x <= platform.position.x - 15 + platform.width
      ) {
        myPlayer.velocity.y = 0;
      }
    });
  }

  function coinHandler() {
    coinObjects.forEach((coin) => {
      if (coin.collected) return;
      if (!coin.touched) coin.draw();

      //collision detection code for coin
      if (
        myPlayer.position.x + myPlayer.width >= coin.position.x &&
        myPlayer.position.x <= coin.position.x + coin.width &&
        myPlayer.position.y <= coin.position.y + coin.height &&
        myPlayer.position.y + myPlayer.height >= coin.position.y
      ) {
        if (coin.isBomb) {
          if (!bombAudioPlayed) bombAudio.play();
          setBombAudioPlayed((bombAudioPlayed = true));
          //particles code
          if (!bombTouched) {
            let particles = [];
            let particleCount = 250;
            let angleIncrement = (Math.PI * 2) / particleCount;

            for (let index = 0; index < particleCount; index++) {
              particles.push(
                new Particle(myCanvas, coin.position.x, coin.position.y, Math.cos(angleIncrement * index) * Math.random() * 8, Math.sin(angleIncrement * index) * Math.random() * 8, 2, "white")
              );
            }
            setParticleObjects((particleObjects = particles));
          }

          setBombTouched((bombTouched = true));
          coin.touched = true;

          removeControlEvents();
          setShowReplayScreen(true);
        } else {
          coinAudio.play();
          coin.collected = true;
          setCollectCount(collectCount++);
          var bar = document.getElementById("score-" + collectCount);
          bar.style.backgroundColor = coin.color;
          bar.style.width = 45.8 + "px";

          //win scenario
          if (collectCount === totalCoins) {
            setShowCongScreen(true);
            setTimeout(() => {
              removeControlEvents();
              cancelAnimationFrame(animateLoop); // stopping the loop
            }, 500);
            console.log("WIN");
          }
        }
      }
    });
  }

  function playerSpriteHandler() {
    if (rightKeyPressed && lastKey === "right" && myPlayer.currentSprite !== myPlayer.sprites.run.right) {
      myPlayer.frames = 1;
      myPlayer.currentSprite = myPlayer.sprites.run.right;

      myPlayer.currentCropWidth = myPlayer.sprites.run.cropWidth;
      myPlayer.width = myPlayer.sprites.run.width;
    } else if (leftKeyPressed && lastKey === "left" && myPlayer.currentSprite !== myPlayer.sprites.run.left) {
      myPlayer.currentSprite = myPlayer.sprites.run.left;
      myPlayer.currentCropWidth = myPlayer.sprites.run.cropWidth;
      myPlayer.width = myPlayer.sprites.run.width;
    } else if (!leftKeyPressed && lastKey === "left" && myPlayer.currentSprite !== myPlayer.sprites.stand.left) {
      myPlayer.currentSprite = myPlayer.sprites.stand.left;
      myPlayer.currentCropWidth = myPlayer.sprites.stand.cropWidth;
      myPlayer.width = myPlayer.sprites.stand.width;
    } else if (!rightKeyPressed && lastKey === "right" && myPlayer.currentSprite !== myPlayer.sprites.stand.right) {
      myPlayer.currentSprite = myPlayer.sprites.stand.right;
      myPlayer.currentCropWidth = myPlayer.sprites.stand.cropWidth;
      myPlayer.width = myPlayer.sprites.stand.width;
    }
  }

  function playerMovementHandler() {
    if (rightKeyPressed && myPlayer.position.x < 650) {
      myPlayer.velocity.x = 8; //speed
    } else if (leftKeyPressed && myPlayer.position.x > 200) {
      myPlayer.velocity.x = -8; //speed
    } else {
      myPlayer.velocity.x = 0;

      //moving platforms and coins
      if (!bombTouched && myPlayer.position.x > platformObjects[0].position.x + 200 && myPlayer.position.x + myPlayer.width <= platformObjects[4].position.x + platformObjects[4].width) {
        platformObjects.forEach((platform) => {
          if (rightKeyPressed) {
            platform.position.x -= 8;
          } else if (leftKeyPressed) {
            platform.position.x += 8;
          }
        });
        coinObjects.forEach((coin) => {
          if (rightKeyPressed) {
            coin.position.x -= 8;
          } else if (leftKeyPressed) {
            coin.position.x += 8;
          }
        });
      }
    }
  }

  function checkDeathPitsFall() {
    if (myPlayer.position.y > myCanvas.height) {
      removeControlEvents();
      setLeftKeyPressed((leftKeyPressed = false));
      setRightKeyPressed((rightKeyPressed = false));
      setLastKey((lastKey = null));
      setShowReplayScreen(true);
    }
  }

  // control Events
  function addControlEvents() {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }

  function removeControlEvents() {
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  }

  function handleKeyDown(e) {
    switch (e.keyCode) {
      case 37:
      case 65:
        setLeftKeyPressed((leftKeyPressed = true));
        setLastKey((lastKey = "left"));
        break;

      case 39:
      case 68:
        setRightKeyPressed((rightKeyPressed = true));
        setLastKey((lastKey = "right"));

        break;

      case 38:
      case 32:
      case 87:
        if (e.repeat) {
          return;
        }
        if (myPlayer.position.y > 0 && myPlayer.velocity.y === 0) {
          myPlayer.velocity.y -= 22;
          jumpAudio.play();
        }
        break;

      default:
        break;
    }
  }

  function handleKeyUp(e) {
    switch (e.keyCode) {
      case 37:
      case 65:
        setLeftKeyPressed((leftKeyPressed = false));
        break;

      case 39:
      case 68:
        setRightKeyPressed((rightKeyPressed = false));

        break;

      case 38:
      case 32:
      case 87:
        break;

      default:
        break;
    }
  }

  return (
    <div className="game">
      <audio autoPlay loop src={Data.audios.gameBg.audioPath}></audio>
      <div className="wrapper">
        <canvas className="canvas" width="1600" height="900"></canvas>
        <div className="score-jar">
          <div className="score-wrapper">{scores}</div>
        </div>
        <div className={"replay-screen " + (showReplayScreen ? "show" : "")}>
          <div className="replay-btn" onClick={restartGame}>
            Replay
          </div>
        </div>
        <div className={"cong-screen " + (showCongScreen ? "show" : "")}>
          <h2 className="cong-label">Congratulations</h2>
          <div className="replay-btn" onClick={restartGame}>
            Replay
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
