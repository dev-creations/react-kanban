import { useState } from "react";
import ColumnForm from "./components/ColumnForm";

interface ColumnAdderProps {
  onConfirm: (title: string) => void;
}

const ColumnAdder = ({ onConfirm }: ColumnAdderProps) => {
  const [isAddingColumn, setAddingColumn] = useState(false);

  const confirmColumn = (title: string) => {
    onConfirm(title);
    setAddingColumn(false);
  };

  return isAddingColumn ? (
    <ColumnForm onConfirm={confirmColumn} onCancel={() => setAddingColumn(false)} />
  ) : (
    <div className='react-kanban-column-adder-button' onClick={() => setAddingColumn(true)} role='button'>
      ➕
    </div>
  );
};

export default ColumnAdder;
