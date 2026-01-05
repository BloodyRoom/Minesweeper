import { useState } from "react";
import { MinesweeperEngine } from "../../game/MinesweeperEngine.ts";

export function useMinesweeper(w = 10, h = 10, m = 10) {
    const [engine, setEngine] = useState(() => new MinesweeperEngine(w, h, m));
    const [, force] = useState(0);

    const update = () => force(v => v + 1);

    return {
        field: engine.field,
        gameOver: engine.gameOver,
        open: (x: number, y: number) => {
            engine.open(x, y);
            update();
        },
        flag: (x: number, y: number) => {
            engine.toggleFlag(x, y);
            update();
        },
        restart: () => setEngine(new MinesweeperEngine(w, h, m)),
    };
}
