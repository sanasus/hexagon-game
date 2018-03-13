import Coordinate from '../../Coordinate';
export class Position {
    public static readonly size: number = 30;
    public static readonly hexH: number = Position.size * 2;
    public static readonly hexW: number = Math.sqrt(3) / 2 * Position.hexH;
    public static readonly hOffset: number = Position.hexW + Position.size / 10;
    public static readonly vOffset: number = Position.hexH * (3 / 4) + Position.size / 10;

    constructor(colID: number, rowID: number) {
        let params: any = {
            name: Position.name,
            center: {
                x: Position.hOffset * (colID + 1) -
                    ((rowID % 2 === 0) ? Position.hOffset : Position.hOffset / 2) + Position.size,
                y: Position.vOffset * (rowID + 1) - Position.vOffset + Position.size,
            },
            coordinate: { col: colID, row: rowID },
            coordinateOffset: Coordinate.axialOffset(colID, rowID),
        };
        return params;
    }
}