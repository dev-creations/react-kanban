import { DropResult } from "react-beautiful-dnd";
declare function isAColumnMove(type: string): boolean;
declare function getCoordinates(event: DropResult, board: any): {
    source?: undefined;
    destination?: undefined;
} | {
    source: {
        fromPosition: number;
    };
    destination: {
        toPosition: number;
    };
} | {
    source: {
        fromColumnId: any;
        fromPosition: number;
    };
    destination: {
        toColumnId: any;
        toPosition: number;
    };
};
declare function getCard(board: any, sourceCoordinate: any): any;
declare function isMovingAColumnToAnotherPosition(coordinates: any): boolean;
declare function isMovingACardToAnotherPosition(coordinates: any): boolean;
export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition };
