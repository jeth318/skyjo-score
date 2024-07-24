"use client";

import { ChangeEvent } from "react";

type Props = {
  scoreIndex: number;
  players: number[];
  getCellScore: (player: number, scoreIndex: number) => number | string;
  handleOnScoreChange: (
    event: ChangeEvent<HTMLInputElement>,
    scoreIndex: number,
    player: number
  ) => void;
};

export default function ScoreRow({
  scoreIndex,
  players,
  handleOnScoreChange,
  getCellScore,
}: Props) {
  return players.map((player) => {
    const cellScore = getCellScore(player, scoreIndex);
    const isLastRowFirstColumn = player === 0 && scoreIndex === 9;
    const isLastRowLastColumn =
      player === players[players.length - 1] && scoreIndex === 9;

    return (
      <div
        key={`player-${player}-score-${scoreIndex}`}
        className={`score-cell h-10 border border-b-stone-400 border-r-stone-400 text-center ${
          isLastRowFirstColumn ? "rounded-bl-md" : ""
        } ${isLastRowLastColumn ? "rounded-br-md" : ""}`}
      >
        <input
          onChange={(event) => handleOnScoreChange(event, player, scoreIndex)}
          className={`h-full w-full rounded-none text-center ${
            Number(cellScore) < 0 ? "text-blue-600" : ""
          } ${isLastRowFirstColumn ? "rounded-bl-md" : ""} ${
            isLastRowLastColumn ? "rounded-br-md" : ""
          }`}
          value={cellScore}
          maxLength={3}
          max={99}
          pattern="/^-?(0|[1-9]\d*)?$/"
          type="number"
        />
      </div>
    );
  });
}
