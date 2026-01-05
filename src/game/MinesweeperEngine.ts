export type Cell = {
    x: number;
    y: number;
    isMine: boolean;
    isOpen: boolean;
    isFlagged: boolean;
    minesAround: number;
};

export type GameStatus = "playing" | "win" | "lose";

export class MinesweeperEngine {
    width: number;
    height: number;
    minesCount: number;

    field: Cell[][] = [];
    status: GameStatus = "playing";

    constructor(width: number, height: number, minesCount: number) {
        this.width = width;
        this.height = height;
        this.minesCount = minesCount;

        this.createField();
    }

    private createField() {
        this.status = 'playing';

        this.field = [];

        for (let y = 0; y < this.height; y++) {
            const row: Cell[] = [];

            for (let x = 0; x < this.width; x++) {
                row.push({
                    x,
                    y,
                    isMine: false,
                    isOpen: false,
                    isFlagged: false,
                    minesAround: 0,
                });
            }

            this.field.push(row);
        }

        this.placeMines();
        this.calculateMinesAround();
    }

    private placeMines() {
        let placedMines = 0;

        while (placedMines < this.minesCount) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);

            const cell = this.field[y][x];

            if (!cell.isMine) {
                cell.isMine = true;
                placedMines++;
            }
        }
    }

    private calculateMinesAround() {
        for (const row of this.field) {
            for (const cell of row) {
                if (cell.isMine) continue;

                const neighbors = this.getNeighbors(cell);
                cell.minesAround = neighbors.filter(n => n.isMine).length;
            }
        }
    }

    private getNeighbors(cell: Cell): Cell[] {
        const neighbors: Cell[] = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                const x = cell.x + dx;
                const y = cell.y + dy;

                if (x < 0 || y < 0 || x >= this.width || y >= this.height) continue;

                neighbors.push(this.field[y][x]);
            }
        }

        return neighbors;
    }

    private checkWin() {
        for (const row of this.field) {
            for (const cell of row) {
                if (!cell.isMine && !cell.isOpen) {
                    return;
                }
            }
        }

        this.status = "win";
    }

    openCell(x: number, y: number) {
        const cell = this.field[y][x];

        if (this.status !== "playing") return;
        if (cell.isOpen || cell.isFlagged) return;

        cell.isOpen = true;

        if (cell.isMine) {
            this.status = "lose";
            return;
        }

        if (cell.minesAround === 0) {
            for (const neighbor of this.getNeighbors(cell)) {
                this.openCell(neighbor.x, neighbor.y);
            }
        }

        this.checkWin();
    }


    toggleFlag(x: number, y: number) {
        const cell = this.field[y][x];
        if (cell.isOpen || this.status !== "playing") return;

        cell.isFlagged = !cell.isFlagged;
    }
}
