import { partialRight, when } from "@services/utils";
import BoardContainer from "./BoardContainer";
import ColumnAdder from "./components/ColumnAdder";
import DefaultCard from "./components/DefaultCard";

const ControlledBoard = (props) => {
  const handleOnDragEnd = ({ source, destination, subject }, { notifyCallback }) => {
    when(notifyCallback)((callback) => callback(subject, source, destination));
  };

  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { notifyCallback: props.onCardDragEnd });
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, { notifyCallback: props.onColumnDragEnd });

  return (
    <BoardContainer
      {...props}
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      renderColumnAdder={() => {
        if (!props.allowAddColumn) return null;
        if (props.renderColumnAdder) return props.renderColumnAdder();
        if (!props.onNewColumnConfirm) return null;
        return <ColumnAdder onConfirm={(title: string) => props.onNewColumnConfirm({ title, cards: [] })} />;
      }}
      renderCard={(_column, card, dragging) => {
        if (props.renderCard) return props.renderCard(card, { dragging });
        return (
          <DefaultCard dragging={dragging} allowRemoveCard={props.allowRemoveCard} onCardRemove={props.onCardRemove}>
            {card}
          </DefaultCard>
        );
      }}
    />
  );
};

export default ControlledBoard;
