/// <reference types="react" />
interface DefaultCardProps {
    children: any;
    dragging: boolean;
    allowRemoveCard: boolean;
    onCardRemove: (card: any) => void;
}
declare const DefaultCard: ({ children: card, dragging, allowRemoveCard, onCardRemove }: DefaultCardProps) => JSX.Element;
export default DefaultCard;
