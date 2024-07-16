"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const defaultScore = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  const [playerOneScore, setPlayerOneScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerTwoScore, setPlayerTwoScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerThreeScore, setPlayerThreeScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerFourScore, setPlayerFourScore] =
    useState<(number | null)[]>(defaultScore);

  const [totalScore, setTotalScore] = useState([0, 0, 0, 0]);

  function getPlayerScoreSetter(index: number) {
    switch (index) {
      case 1:
        return {
          setter: setPlayerOneScore,
          score: playerOneScore,
        };
      case 2:
        return {
          setter: setPlayerTwoScore,
          score: playerTwoScore,
        };
      case 3:
        return {
          setter: setPlayerThreeScore,
          score: playerThreeScore,
        };
      case 4:
        return {
          setter: setPlayerFourScore,
          score: playerFourScore,
        };
      default:
        return {};
    }
  }

  /*   useEffect(() => {
    console.log({
      playerOneScore,
      playerTwoScore,
      playerThreeScore,
      playerFourScore,
    });
  }, [playerOneScore, playerTwoScore, playerThreeScore, playerFourScore]); */

  const router = useRouter();

  function getCellScore(player: number, cell: number) {
    const { score } = getPlayerScoreSetter(player);

    return score?.[cell];
  }

  return (
    <main className="flex flex-col min-h-screen p-2 bg-gradient-to-b from-indigo-500 via-purple-500  to-pink-500">
      <div className="flex justify-between items-center text-white">
        <h1 className="text-2xl p-0 m-0">SKYJO SCORE</h1>
        <button
          type="button"
          onClick={() => {
            setPlayerOneScore(defaultScore);
            setPlayerTwoScore(defaultScore);
            setPlayerThreeScore(defaultScore);
            setPlayerFourScore(defaultScore);
          }}
          className="btn self-end btn-ghost border-white"
        >
          Börja om
        </button>
      </div>
      <div className="flex justify-between h-12 w-full ">
        <table className="table shadow-lg">
          <thead>
            <tr>
              <th className=""></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              {[1, 2, 3, 4].map((index) => {
                return (
                  <th
                    key={index}
                    className="rounded-md p-0 m-0 border border-stone-500"
                  >
                    <input
                      className="h-10 bg-green-800 text-white  first:rounded-t-md last:rounded-t-md text-center"
                      style={{
                        width: "100%",
                      }}
                      size={1}
                      maxLength={7}
                      type="text"
                    />
                  </th>
                );
              })}
            </tr>
            <tr>
              {[1, 2, 3, 4].map((index) => {
                const { score } = getPlayerScoreSetter(index);
                const scoresAsNum = score
                  ?.filter(Number.isInteger)
                  .map((s) => Number(s));

                const totalPlayerScore = scoresAsNum?.reduce(
                  (acc, curr) => acc + curr,
                  0
                );

                return (
                  <td key={index} className="p-0 m-0 border-r last:border-r-0">
                    <div className="font-bold bg-gray-700 text-white flex justify-center h-10 items-center">
                      {totalPlayerScore}
                    </div>
                  </td>
                );
              })}
            </tr>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, scoreIndex) => {
              return (
                <tr key={`player-${scoreIndex}`}>
                  {[1, 2, 3, 4].map((player, i) => {
                    return (
                      <td
                        key={player}
                        className="p-0 m-0 border-r last-border-r-0 border-b border-stone-400"
                      >
                        <input
                          onChange={({ target: { value } }) => {
                            const { setter, score = [] } =
                              getPlayerScoreSetter(player);
                            const updatedScore = [...score];
                            updatedScore[scoreIndex] = parseInt(value);
                            setter?.(updatedScore);
                          }}
                          className="h-10 rounded-none text-center"
                          style={{
                            width: "100%",
                          }}
                          value={getCellScore(player, scoreIndex) || ""}
                          size={1}
                          maxLength={3}
                          type="number"
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
