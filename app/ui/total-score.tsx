import { getTotalScoreColor } from "../lib/utils";

type Props = {
  score: (number | null)[] | undefined;
};

export default function TotalScore({ score }: Props) {
  const scoresAsNum = score?.filter(Number.isInteger).map((s) => Number(s));

  const totalPlayerScore =
    scoresAsNum?.reduce((acc, curr) => acc + curr, 0) || 0;
  return (
    <div className="w-full border-r last:border-r-0">
      <div
        className={`score-cell-xl font-bold ${getTotalScoreColor(
          totalPlayerScore
        )}  text-white flex justify-center h-14 items-center`}
      >
        <div className="flex flex-col">
          <div className="flex justify-center">{totalPlayerScore}</div>
        </div>
      </div>
    </div>
  );
}
