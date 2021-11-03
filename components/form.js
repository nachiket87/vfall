import AddName from "./addname";
import {
  Center,
  Button,
  List,
  ListItem,
  CloseButton,
  Flex,
  Wrap,
  WrapItem,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { AVATAR_URLS } from "../constants/constants";

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
      <div>
        <List spacing={3}>
          {names.map((name, index) => {
            return (
              <div key={`${name}_${index}`}>
                <div style={{ margin: "10px" }}>
                  <Flex alignItems="center">
                    <CloseButton size="sm" onClick={() => removeName(name)} />
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          name={name}
                          src={
                            AVATAR_URLS[name.toLowerCase()] ||
                            AVATAR_URLS["vention"]
                          }
                        />
                      </WrapItem>
                    </Wrap>
                    <ListItem>{name}</ListItem>
                  </Flex>
                </div>
                <Divider />
              </div>
            );
          })}
        </List>
        <AddName names={names} setNames={setNames} />
        <div style={{ marginTop: "25px" }}>
          <Center>
            <Button colorScheme="blue" onClick={startGame}>
              Start
            </Button>
          </Center>
        </div>
      </div>
    </Center>
  );
};

export default Form;
