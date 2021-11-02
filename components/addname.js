import { useState, useRef } from "react";
import { Button, Input, Flex, FormControl } from "@chakra-ui/react";

const AddName = ({ names, setNames }) => {
  const [name, setName] = useState("");
  const inputEl = useRef(null);
  const addNameToList = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      setNames([...names, name]);
      setName("");
      inputEl.current.focus();
      inputEl.current.value = "";
    }
  };
  return (
    <Flex direction="column">
      <form onSubmit={(e) => addNameToList(e)}>
        <FormControl>
          <Input
            ref={inputEl}
            placeholder="Add new player..."
            marginY={25}
            onChange={(e) => setName(e.target.value)}
          />
          <Button colorScheme="blue" onClick={addNameToList}>
            Add Name
          </Button>
        </FormControl>
      </form>
    </Flex>
  );
};
export default AddName;
