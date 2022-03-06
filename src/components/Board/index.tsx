import UncontrolledBoard from "./UncontrolledBoard";
import ControlledBoard from "./ControlledBoard";

const Board = (props) => {
  return "initialBoard" in props ? <UncontrolledBoard {...props} /> : <ControlledBoard {...props} />;
};

export default Board;
