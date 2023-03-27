import React, { useEffect, useState } from "react";
import Game from "./myComponents/Game";
import Splash from "./myComponents/Splash";
import Data from "./data";

function App() {
  var [assetLoaded, setAssetLoaded] = useState(() => {
    return false;
  });

  var [startGame, setStartGame] = useState(() => {
    return false;
  });

  //  mounted
  useEffect(() => {
    preloadAssets();
  }, []);

  function preloadAssets() {
    var assets = [];
    for (let i = 0; i < Data.preloadAssets.length; i++) {
      if (Data.preloadAssets[i].includes("audios")) {
        assets[i] = new Audio();
        assets[i].src = Data.preloadAssets[i];
        assets[i].preload = true;
      } else {
        assets[i] = new Image();
        assets[i].src = Data.preloadAssets[i];
      }
    }
    setAssetLoaded(true);
  }

  function startPlay() {
    setStartGame(true);
  }

  return (
    <div className="my-app">
      {startGame ? (
        <Game></Game>
      ) : assetLoaded ? (
        <Splash handlePlay={startPlay}></Splash>
      ) : (
        <div className="loader">
          <span className="loader-spinner"></span>Loading Assets
        </div>
      )}
    </div>
  );
}

export default App;
