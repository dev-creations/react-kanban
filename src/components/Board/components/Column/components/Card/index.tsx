import { Draggable } from "react-beautiful-dnd";

const Card = ({
  children,
  index,
  renderCard,
  disableCardDrag,
}: {
  children: any;
  index: number;
  renderCard: any;
  disableCardDrag: boolean;
}) => {
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, { isDragging }) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid={`card-${children.id}`}
          >
            <div style={{ display: "inline-block", whiteSpace: "normal" }}>{renderCard(isDragging)}</div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Card;
