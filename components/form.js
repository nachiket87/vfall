import { useState } from "react";
import {
  Center,
  Button,
  List,
  Input,
  ListItem,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

const Form = ({ startgame, setnames, names }) => {
  const [name, setName] = useState("");
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
            {names.map((name, index) => {
              return (
                <Flex key={`${name}_${index}`}>
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
        <Flex direction="column">
          <Input
            placeholder="Add new player..."
            marginY={25}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            colorScheme="blue"
            onClick={() => {
              setnames([...names, name]);
            }}
          >
            Add Name
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default Form;
