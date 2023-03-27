var Data = {
  platforms: [
    //running platforms starts here
    {
      position: {
        x: 0,
        y: 835,
      },
      width: 1000,
      height: 65,
      imagePath: "images/running-track_blue.png",
    },
    {
      position: {
        x: 1000,
        y: 835,
      },
      width: 1000,
      height: 65,
      imagePath: "images/running-track_blue.png",
    },
    {
      position: {
        x: 2300,
        y: 835,
      },
      width: 1000,
      height: 65,
      imagePath: "images/running-track_blue.png",
    },
    {
      position: {
        x: 3600,
        y: 835,
      },
      width: 98,
      height: 65,
      imagePath: "images/running-track_blue-mini.png",
    },
    {
      position: {
        x: 5200,
        y: 835,
      },
      width: 1000,
      height: 65,
      imagePath: "images/running-track_blue.png",
    },

    //running platforms ends here

    {
      position: {
        x: 700,
        y: 600,
      },
      width: 250,
      height: 85,
      imagePath: "images/styled-rock-250.png",
    },
    {
      position: {
        x: 1200,
        y: 400,
      },
      width: 400,
      height: 120,
      imagePath: "images/styled-rock-400.png",
    },
    {
      position: {
        x: 2700,
        y: 600,
      },
      width: 100,
      height: 70,
      imagePath: "images/block.png",
    },
    {
      position: {
        x: 3100,
        y: 400,
      },
      width: 250,
      height: 85,
      imagePath: "images/styled-rock-250-r.png",
    },
    {
      position: {
        x: 3900,
        y: 600,
      },
      width: 100,
      height: 70,
      imagePath: "images/block.png",
    },
    {
      position: {
        x: 4300,
        y: 400,
      },
      width: 400,
      height: 120,
      imagePath: "images/styled-rock-400-r.png",
    },
    {
      position: {
        x: 5010,
        y: 600,
      },
      width: 100,
      height: 70,
      imagePath: "images/block.png",
    },

    {
      position: {
        x: 6350,
        y: 650,
      },
      width: 100,
      height: 70,
      imagePath: "images/dead_end.png",
    },

    //for covering spaceship
    {
      position: {
        x: 6200,
        y: 633,
      },
      width: 98,
      height: 65,
      imagePath: "images/running-track_blue-mini-stop.png",
    },
  ],
  coins: [
    {
      position: {
        x: 790,
        y: 500,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-blue.png",
      isBomb: false,
      color: "#3c7fbe",
    },
    {
      position: {
        x: 1370,
        y: 300,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-red.png",
      isBomb: false,
      color: "#cc1b1f",
    },
    {
      position: {
        x: 2722,
        y: 400,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-green.png",
      isBomb: false,
      color: "#8dca49",
    },
    {
      position: {
        x: 3200,
        y: 200,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-purple.png",
      isBomb: false,
      color: "#ad25b3",
    },
    {
      position: {
        x: 3620,
        y: 700,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-gold.png",
      isBomb: false,
      color: "#d8b43c",
    },
    {
      position: {
        x: 3925,
        y: 320,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-blue.png",
      isBomb: false,
      color: "#3c7fbe",
    },
    {
      position: {
        x: 4350,
        y: 320,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-red.png",
      isBomb: false,
      color: "#cc1b1f",
    },
    {
      position: {
        x: 4600,
        y: 320,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-green.png",
      isBomb: false,
      color: "#8dca49",
    },
    {
      position: {
        x: 5035,
        y: 520,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-purple.png",
      isBomb: false,
      color: "#ad25b3",
    },
    {
      position: {
        x: 5735,
        y: 740,
      },
      width: 50,
      height: 79,
      imagePath: "images/e-gold.png",
      isBomb: false,
      color: "#d8b43c",
    },

    //bombs start here
    {
      position: {
        x: 1700,
        y: 750,
      },
      width: 50,
      height: 68,
      imagePath: "images/bomb.png",
      isBomb: true,
    },
    {
      position: {
        x: 3200,
        y: 750,
      },
      width: 50,
      height: 68,
      imagePath: "images/bomb.png",
      isBomb: true,
    },
    {
      position: {
        x: 4473,
        y: 331,
      },
      width: 50,
      height: 68,
      imagePath: "images/bomb.png",
      isBomb: true,
    },
    {
      position: {
        x: 5435,
        y: 750,
      },
      width: 50,
      height: 68,
      imagePath: "images/bomb.png",
      isBomb: true,
    },
    //bombs end here
  ],
  gameBg: {
    imagePath: "images/game-bg-1.jpg",
  },
  runLeft: {
    imagePath: "images/spriteRunLeft.png",
  },
  runRight: {
    imagePath: "images/spriteRunRight.png",
  },
  standLeft: {
    imagePath: "images/spriteStandLeft.png",
  },
  standRight: {
    imagePath: "images/spriteStandRight.png",
  },

  audios: {
    gameBg: {
      audioPath: "audios/game_bg.mp3",
    },
    jump: {
      audioPath: "audios/jump.mp3",
    },
    coin: {
      audioPath: "audios/coin.mp3",
    },
    bomb: {
      audioPath: "audios/bomb.mp3",
    },
  },
  preloadAssets: [
    "images/running-track_blue.png",
    "images/running-track_blue-mini.png",
    "images/styled-rock-250.png",
    "images/styled-rock-400.png",
    "images/block.png",
    "images/styled-rock-250-r.png",
    "images/styled-rock-400-r.png",
    "images/dead_end.png",
    "images/running-track_blue-mini-stop.png",
    "images/e-blue.png",
    "images/e-red.png",
    "images/e-green.png",
    "images/e-purple.png",
    "images/e-gold.png",
    "images/bomb.png",
    "images/game-bg-1.jpg",
    "images/spriteRunLeft.png",
    "images/spriteRunRight.png",
    "images/spriteStandLeft.png",
    "images/spriteStandRight.png",
    "images/confetti.svg",
    "images/m-bar.png",
    "images/splash-bg.jpg",
    "images/game-title.png",
    "images/elixirs.png",
    "images/elixir-tracker.png",
    "images/controls.png",
    "audios/game_bg.mp3",
    "audios/jump.mp3",
    "audios/coin.mp3",
    "audios/bomb.mp3"
  ],
};

export default Data;
