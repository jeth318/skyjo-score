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
    return (
      <td key={`player-${player}-score-${scoreIndex}`} className="p-0 m-0 h-12">
        <input
          onChange={(event) => handleOnScoreChange(event, player, scoreIndex)}
          className="h-full p-0 m-0 w-full border rounded-none text-center"
          value={getCellScore(player, scoreIndex) || ""}
          maxLength={3}
          type="number"
        />
      </td>
    );
  });
}
