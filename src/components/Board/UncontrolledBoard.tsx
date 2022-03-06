import { useState } from "react";
import { addColumn, removeColumn, changeColumn, addCard, removeCard, moveCard, moveColumn } from "@services/helpers";
import { when, partialRight } from "@services/utils";
import BoardContainer from "./BoardContainer";
import ColumnAdder from "./components/ColumnAdder";
import DefaultCard from "./components/DefaultCard";

const UncontrolledBoard = ({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  allowAddColumn,
  renderColumnAdder,
  onNewColumnConfirm,
  onColumnRemove,
  renderColumnHeader,
  allowRemoveColumn,
  allowRenameColumn,
  onColumnRename,
  onCardNew,
  renderCard,
  allowRemoveCard,
  onCardRemove,
  onColumnNew,
  disableCardDrag,
  disableColumnDrag,
  allowAddCard,
  onNewCardConfirm,
}) => {
  const [board, setBoard] = useState(initialBoard);

  const handleOnDragEnd = ({ source, destination, subject }, { moveCallback, notifyCallback }) => {
    const reorderedBoard = moveCallback(board, source, destination);
    when(notifyCallback)((callback) => callback(reorderedBoard, subject, source, destination));
    setBoard(reorderedBoard);
  };

  const handleColumnAdd = async (newColumn) => {
    const column = renderColumnAdder ? newColumn : await onNewColumnConfirm(newColumn);
    const boardWithNewColumn = addColumn(board, column);
    onColumnNew(boardWithNewColumn, column);
    setBoard(boardWithNewColumn);
  };

  const handleColumnRemove = (column) => {
    const filteredBoard = removeColumn(board, column);
    onColumnRemove(filteredBoard, column);
    setBoard(filteredBoard);
  };

  const handleColumnRename = (column, title: string) => {
    const boardWithRenamedColumn = changeColumn(board, column, { title });
    onColumnRename(boardWithRenamedColumn, { ...column, title });
    setBoard(boardWithRenamedColumn);
  };

  const handleCardAdd = (column, card, options: { on?: "top" | "bottom" | undefined } = {}) => {
    const boardWithNewCard = addCard(board, column, card, options);

    onCardNew(
      boardWithNewCard,
      boardWithNewCard.columns.find(({ id }) => id === column.id),
      card
    );
    setBoard(boardWithNewCard);
  };

  const handleDraftCardAdd = async (column, card, options: { on: "top" | "bottom" | undefined }) => {
    const newCard = await onNewCardConfirm(card);
    handleCardAdd(column, newCard, options);
  };

  const handleCardRemove = (column, card) => {
    const boardWithoutCard = removeCard(board, column, card);
    onCardRemove(
      boardWithoutCard,
      boardWithoutCard.columns.find(({ id }) => id === column.id),
      card
    );
    setBoard(boardWithoutCard);
  };

  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd });
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
    moveCallback: moveColumn,
    notifyCallback: onColumnDragEnd,
  });

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!allowAddColumn) return null;
        if (renderColumnAdder) return renderColumnAdder({ addColumn: handleColumnAdd });
        if (!onNewColumnConfirm) return null;
        return <ColumnAdder onConfirm={(title: string) => handleColumnAdd({ title, cards: [] })} />;
      }}
      {...(renderColumnHeader && {
        renderColumnHeader: (column) =>
          renderColumnHeader(column, {
            removeColumn: handleColumnRemove.bind(null, column),
            renameColumn: handleColumnRename.bind(null, column),
            addCard: handleCardAdd.bind(null, column),
          }),
      })}
      renderCard={(column, card, dragging) => {
        if (renderCard) return renderCard(card, { removeCard: handleCardRemove.bind(null, column, card), dragging });
        return (
          <DefaultCard
            dragging={dragging}
            allowRemoveCard={allowRemoveCard}
            onCardRemove={(card) => handleCardRemove(column, card)}
          >
            {card}
          </DefaultCard>
        );
      }}
      allowRemoveColumn={allowRemoveColumn}
      onColumnRemove={handleColumnRemove}
      allowRenameColumn={allowRenameColumn}
      onColumnRename={handleColumnRename}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
      onCardNew={(column, card) =>
        allowAddCard && handleDraftCardAdd(column, card, allowAddCard === true ? { on: "bottom" } : allowAddCard)
      }
      allowAddCard={allowAddCard && onNewCardConfirm}
    >
      {board}
    </BoardContainer>
  );
};

export default UncontrolledBoard;
