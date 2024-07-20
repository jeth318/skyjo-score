import { getTotalScoreColor } from "../lib/utils";

type Props = {
  score: (number | string)[] | undefined;
};

export default function TotalScore({ score }: Props) {
  const scoresAsNum = score?.map((s) => Number(s)).filter(Number.isInteger);
  const totalPlayerScore =
    scoresAsNum?.reduce((acc, curr) => acc + curr, 0) || 0;
  return (
    <div className="w-1/4 overflow-hidden border-r last:border-r-0">
      <div
        className={`score-cell-xl font-bold ${getTotalScoreColor(
          totalPlayerScore
        )}  text-white flex justify-center h-14 items-center`}
      >
        <input
          className="w-full bg-transparent text-center p-0 m-0"
          disabled
          maxLength={3}
          value={totalPlayerScore}
        ></input>
      </div>
    </div>
  );
}
