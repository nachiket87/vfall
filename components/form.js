import AddName from "./addname";
import {
  Center,
  Button,
  List,
  ListItem,
  CloseButton,
  Flex,
} from "@chakra-ui/react";

const Form = ({ setGameStarted, setNames, names }) => {
  const startGame = () => {
    setGameStarted(true);
  };

  const removeName = (name) => {
    const newNames = names.filter((eachName) => {
      return eachName != name;
    });
    setNames(newNames);
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
        <AddName names={names} setNames={setNames} />
      </Flex>
    </Center>
  );
};

export default Form;
