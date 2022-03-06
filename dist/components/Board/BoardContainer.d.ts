/// <reference types="react" />
declare const BoardContainer: ({ children: board, renderCard, disableColumnDrag, disableCardDrag, renderColumnHeader, renderColumnAdder, allowRemoveColumn, onColumnRemove, allowRenameColumn, onColumnRename, onColumnDragEnd, onCardDragEnd, onCardNew, allowAddCard, }: {
    children: any;
    renderCard: any;
    disableColumnDrag: any;
    disableCardDrag: any;
    renderColumnHeader: any;
    renderColumnAdder: any;
    allowRemoveColumn: any;
    onColumnRemove: any;
    allowRenameColumn: any;
    onColumnRename: any;
    onColumnDragEnd: any;
    onCardDragEnd: any;
    onCardNew: any;
    allowAddCard?: any;
}) => JSX.Element;
export default BoardContainer;
