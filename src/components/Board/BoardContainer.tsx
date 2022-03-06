import withDroppable from "@components/withDroppable";
import { forwardRef } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Column from "./components/Column";
import DefaultColumnHeader from "./components/DefaultColumnHeader";
import {
  getCoordinates,
  isAColumnMove,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
  getCard,
} from "./services";

const Columns = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ whiteSpace: "nowrap" }} {...props} />
));

const DroppableBoard = withDroppable(Columns);

const BoardContainer = ({
  children: board,
  renderCard,
  disableColumnDrag,
  disableCardDrag,
  renderColumnHeader,
  renderColumnAdder,
  allowRemoveColumn,
  onColumnRemove,
  allowRenameColumn,
  onColumnRename,
  onColumnDragEnd,
  onCardDragEnd,
  onCardNew,
  allowAddCard = null,
}) => {
  const handleOnDragEnd = (event: DropResult) => {
    const coordinates = getCoordinates(event, board);
    if (!coordinates.source) return;

    isAColumnMove(event.type)
      ? isMovingAColumnToAnotherPosition(coordinates) &&
        onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
      : isMovingACardToAnotherPosition(coordinates) &&
        onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div style={{ overflowY: "hidden", display: "flex", alignItems: "flex-start" }} className='react-kanban-board'>
        <DroppableBoard droppableId='board-droppable' direction='horizontal' type='BOARD'>
          {board.columns.map((column, index) => (
            <Column
              key={column.id}
              index={index}
              renderCard={renderCard}
              renderColumnHeader={(column: any) =>
                renderColumnHeader ? (
                  renderColumnHeader(column)
                ) : (
                  <DefaultColumnHeader
                    allowRemoveColumn={allowRemoveColumn}
                    onColumnRemove={onColumnRemove}
                    allowRenameColumn={allowRenameColumn}
                    onColumnRename={onColumnRename}
                  >
                    {column}
                  </DefaultColumnHeader>
                )
              }
              disableColumnDrag={disableColumnDrag}
              disableCardDrag={disableCardDrag}
              onCardNew={onCardNew}
              allowAddCard={allowAddCard}
            >
              {column}
            </Column>
          ))}
        </DroppableBoard>
        {renderColumnAdder()}
      </div>
    </DragDropContext>
  );
};

export default BoardContainer;
