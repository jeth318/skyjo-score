type Props = {
  score: (number | null)[] | undefined;
};

export default function TotalScore({ score }: Props) {
  const scoresAsNum = score?.filter(Number.isInteger).map((s) => Number(s));

  const totalPlayerScore =
    scoresAsNum?.reduce((acc, curr) => acc + curr, 0) || 0;
  return (
    <td className="p-0 m-0 border-r last:border-r-0">
      <div
        className={`font-bold ${
          totalPlayerScore < 50 ? "bg-green-800" : "bg-red-700"
        } text-white flex justify-center h-10 items-center`}
      >
        {totalPlayerScore}
      </div>
    </td>
  );
}
