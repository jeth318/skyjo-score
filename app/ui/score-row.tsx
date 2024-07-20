"use client";

import { ChangeEvent } from "react";

type Props = {
  scoreIndex: number;
  getCellScore: (player: number, scoreIndex: number) => number | string;
  handleOnScoreChange: (
    event: ChangeEvent<HTMLInputElement>,
    scoreIndex: number,
    player: number
  ) => void;
};

export default function ScoreRow({
  scoreIndex,
  handleOnScoreChange,
  getCellScore,
}: Props) {
  return [1, 2, 3, 4].map((player, i) => {
    const cellScore = getCellScore(player, scoreIndex);
    return (
      <div
        key={`player-${player}-score-${scoreIndex}`}
        className="score-cell  h-10 border border-b-stone-400 border-r-stone-400 text-center fade-in-animation"
      >
        <input
          onChange={(event) => handleOnScoreChange(event, player, scoreIndex)}
          className={`h-full w-full rounded-none text-center ${
            Number(cellScore) < 0 ? "text-blue-600" : ""
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
