import { getTotalScoreColor } from "../lib/utils";

type Props = {
  score: (number | string)[] | undefined;
  hasLoadedScores: boolean;
};

export default function TotalScore({ score, hasLoadedScores }: Props) {
  const scoresAsNum = score?.map((s) => Number(s)).filter(Number.isInteger);
  const totalPlayerScore =
    scoresAsNum?.reduce((acc, curr) => acc + curr, 0) || 0;
  return (
    <div className="w-1/4 overflow-hidden border-r last:border-r-0">
      <div
        className={`score-cell-xl font-bold ${getTotalScoreColor(
          totalPlayerScore,
          hasLoadedScores
        )}  text-white flex justify-center h-14 items-center`}
      >
        <div className="w-full  text-center p-0 m-0">
          {hasLoadedScores ? totalPlayerScore : ""}
        </div>
      </div>
    </div>
  );
}
