import { useState } from "react";
import dynamic from "next/dynamic";
import Form from "../../components/form";

const AVATAR_URLS = {
  Nick: "https://avatars.githubusercontent.com/u/7636254?v=4",
  Lucas: "https://avatars.githubusercontent.com/u/26128560?v=4",
  Johnny: "https://avatars.githubusercontent.com/u/42249198?v=4",
  Kiril: "https://avatars.githubusercontent.com/u/19571383?v=4",
  Nirmohi: "https://avatars.githubusercontent.com/u/12480324?v=4",
  Martin: "https://avatars.githubusercontent.com/u/19353631?v=4",
  Yann: "https://avatars.githubusercontent.com/u/6068943?v=4",
  Vention: "https://avatars.githubusercontent.com/u/19786058?v=4",
  Sam: "https://avatars.githubusercontent.com/u/59837266?v=4",
  Nachiket: "https://avatars.githubusercontent.com/u/33430835?v=4",
};

const ParentCavas = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [names, setNames] = useState([
    "Nick",
    "Yann",
    "Nirmohi",
    "Nachiket",
    "Sam",
    "Pawan",
    "Kiril",
    "Lucas",
    "Johnny",
  ]);
  return (
    <>
      {!gameStarted ? (
        <Form
          setGameStarted={setGameStarted}
          setNames={setNames}
          names={names}
        />
      ) : (
        <Canvas names={names} />
      )}
    </>
  );
};

const Canvas = ({ names }) => {
  const Sketch = dynamic(() => import("react-p5"), {
    ssr: false,
  });

  const players = [];
  let profile;
  let avatars = {};

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.noStroke();
    avatars = names.reduce(
      (avatars, name) =>
        Object.assign(avatars, {
          [name]: p5.loadImage(
            AVATAR_URLS[name] ? AVATAR_URLS[name] : AVATAR_URLS["Vention"]
          ),
        }),
      {}
    );
    profile = p5.loadImage(
      "https://avatars.githubusercontent.com/u/7636254?v=4"
    );
  };

  function player(p5) {
    // initialize coordinates
    this.posX = 0;
    this.posY = p5.random(-50, 0);
    this.initialangle = p5.random(0, 2 * p5.PI);
    this.size = 2;
    this.name = "";

    // radius of player spiral
    // players are uniformly spread out in area
    this.radius = p5.sqrt(p5.random(p5.pow(p5.width / 2, 2)));

    this.update = function (time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;

      // different size profile picture fall at slightly different y speeds

      // delete snowflake if past end of screen
      if (this.posY <= p5.height - 50) {
        this.posY += p5.pow(this.size, 0.5);
        this.posX = p5.width / 2 + this.radius * p5.sin(angle);
      }
    };

    this.display = function () {
      p5.textSize(16);
      p5.text(this.name, this.posX, this.posY);
      p5.fill("black");
      p5.image(avatars[this.name], this.posX, this.posY, 50, 50);
    };
  }

  const draw = (p5) => {
    p5.background("white");
    p5.line(p5.width / 2, 0, p5.width / 2, p5.height, 0);
    p5.stroke(5);
    let t = p5.frameCount / 60;
    for (name in names) {
      const p = new player(p5);
      p.name = names.pop();
      players.push(p);
    }

    for (let player of players) {
      player.update(t);
      player.display();
    }
    const gameOver = players.every(function (e) {
      return e.posY >= p5.height - 50;
    });

    if (gameOver) {
      p5.noLoop();
      declareWinner(p5);
    }
  };

  const declareWinner = (p5) => {
    let midPoint = p5.width / 2;
    let winnerDistance = midPoint;
    let winner = players[0];
    players.forEach((player) => {
      const playerDistance = Math.abs(player.posX - midPoint);
      if (playerDistance < winnerDistance) {
        winnerDistance = playerDistance;
        winner = player;
      }
    });
    if (winner) {
      alert(`${winner.name}`);
    } else {
      alert(`there are no winners in this game`);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default ParentCavas;
