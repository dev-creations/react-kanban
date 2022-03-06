interface DefaultCardProps {
  children: any;
  dragging: boolean;
  allowRemoveCard: boolean;
  onCardRemove: (card: any) => void;
}

const DefaultCard = ({ children: card, dragging, allowRemoveCard, onCardRemove }: DefaultCardProps) => {
  return (
    <div className={`react-kanban-card ${dragging ? "react-kanban-card--dragging" : ""}`}>
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          {allowRemoveCard && (
            <span style={{ cursor: "pointer" }} onClick={() => onCardRemove(card)}>
              ×
            </span>
          )}
        </div>
      </span>
      <div className='react-kanban-card__description'>{card.description}</div>
    </div>
  );
};

export default DefaultCard;
