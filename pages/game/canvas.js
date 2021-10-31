import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Center,
  Button,
  List,
  ListItem,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

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
        <Form startgame={setGameStarted} setnames={setNames} names={names} />
      ) : (
        <Canvas names={names} />
      )}
    </>
  );
};

const Form = ({ startgame, setnames, names }) => {
  const startGame = () => {
    startgame(true);
  };

  const removeName = (name) => {
    const newNames = names.filter((eachName) => {
      return eachName != name;
    });
    setnames(newNames);
  };

  return (
    <Center marginTop={"100px"}>
      <Flex direction={"column"}>
        <List spacing={3}>
          <Flex direction={"column"}>
            {names.map((name) => {
              return (
                <Flex key={name}>
                  <CloseButton size="sm" onClick={() => removeName(name)} />
                  <ListItem>{name}</ListItem>
                </Flex>
              );
            })}
          </Flex>
        </List>
        <div>
          <Center>
            <Button colorScheme="blue" onClick={startGame}>
              Start
            </Button>
          </Center>
        </div>
      </Flex>
    </Center>
  );
};

const Canvas = ({ names }) => {
  const players = [];
  const Sketch = dynamic(() => import("react-p5"), {
    ssr: false,
  });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(
      canvasParentRef
    );
    p5.noStroke();
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

      // different size snowflakes fall at slightly different y speeds

      // delete snowflake if past end of screen
      if (this.posY <= p5.height - 10) {
        this.posY += p5.pow(this.size, 0.5);
        this.posX = p5.width / 2 + this.radius * p5.sin(angle);
      }
    };

    this.display = function () {
      p5.textSize(32);
      p5.text(this.name, this.posX, this.posY);
      p5.fill("black");
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
      return e.posY >= p5.height - 10;
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
    alert(`${winner.name}`);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default ParentCavas;
