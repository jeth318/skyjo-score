import { ChangeEvent } from "react";
import { validScoreInput, validScoreInputCapture } from "../lib/utils";

type Props = {
  scoreIndex: number;
  getCellScore: (
    player: number,
    scoreIndex: number
  ) => number | null | undefined;
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
    const cellScore = getCellScore(player, scoreIndex) || "";
    return (
      <div
        key={`player-${player}-score-${scoreIndex}`}
        className="score-cell w-1/4 p-0 m-0 h-10 border border-t-none border-b-stone-400 border-r-stone-400 text-center"
      >
        <input
          onChange={(event) => handleOnScoreChange(event, player, scoreIndex)}
          className={`h-full w-full border-none rounded-none text-center ${
            Number(cellScore) < 0 ? "text-blue-600" : ""
          }`}
          value={cellScore}
          maxLength={3}
          type="number"
        />
      </div>
    );
  });
}
