"use client";

import { ChangeEvent, useEffect, useState } from "react";

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

  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);

  const [playerOneScore, setPlayerOneScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerTwoScore, setPlayerTwoScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerThreeScore, setPlayerThreeScore] =
    useState<(number | null)[]>(defaultScore);
  const [playerFourScore, setPlayerFourScore] =
    useState<(number | null)[]>(defaultScore);

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

  function validScoreInput(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    return (
      Number.isInteger(parseInt(event.target.value)) ||
      value === "-" ||
      value === ""
    );
  }

  function saveScoreToStorage(player: number, updatedScore: (number | null)[]) {
    const currentGameState = [
      playerOneScore,
      playerTwoScore,
      playerThreeScore,
      playerFourScore,
    ];

    currentGameState[player - 1] = updatedScore;
    const state = JSON.stringify(currentGameState);
    state && localStorage.setItem("scores", state);
  }

  function loadStorageScore() {
    const savedGameState = localStorage.getItem("scores");
    if (savedGameState) {
      const scores = JSON.parse(savedGameState);
      console.log({ scores });

      setPlayerOneScore(scores[0]);
      setPlayerTwoScore(scores[1]);
      setPlayerThreeScore(scores[2]);
      setPlayerFourScore(scores[3]);
    }
  }

  function loadStoragePlayers() {
    const savedPlayersState = localStorage.getItem("players");
    if (savedPlayersState) {
      console.log(JSON.parse(savedPlayersState));
      setPlayerNames(JSON.parse(savedPlayersState));
    }
  }

  function getCellScore(player: number, cell: number) {
    const { score } = getPlayerScoreSetter(player);
    return score?.[cell];
  }

  function handleOnScoreChange(
    event: ChangeEvent<HTMLInputElement>,
    player: number,
    scoreIndex: number
  ) {
    if (validScoreInput(event)) {
      const { setter, score = [] } = getPlayerScoreSetter(player);
      const updatedScore = [...score];
      updatedScore[scoreIndex] = parseInt(event.target.value);
      setter?.(updatedScore);
      saveScoreToStorage(player, updatedScore);
    }
  }

  function handleOnReset() {
    {
      const confirm = window.confirm("Rensa alla poäng och börja om?");
      if (confirm) {
        localStorage.removeItem("scores");
        setPlayerOneScore(defaultScore);
        setPlayerTwoScore(defaultScore);
        setPlayerThreeScore(defaultScore);
        setPlayerFourScore(defaultScore);
      }
    }
  }

  useEffect(() => {
    loadStoragePlayers();
    loadStorageScore();
  }, []);

  return (
    <main className="flex flex-col min-h-screen p-2 bg-gradient-to-b from-indigo-500 via-purple-500  to-pink-500">
      <div className="flex justify-between items-center text-white">
        <h1 className="text-2xl p-0 m-0">SKYJO SCORE</h1>
        <button
          type="button"
          onClick={handleOnReset}
          className="btn self-end btn-ghost border-white"
        >
          Börja om
        </button>
      </div>
      <div className="flex justify-between h-12 w-full ">
        <table className="table shadow-lg">
          <tbody>
            <tr>
              {playerNames.map((_, index) => {
                return (
                  <th
                    key={index}
                    className="rounded-md p-0 m-0 border border-stone-500"
                  >
                    <input
                      className="h-10  bg-gray-700 text-white  first:rounded-t-md last:rounded-t-md text-center"
                      style={{
                        width: "100%",
                      }}
                      value={playerNames[index]}
                      onChange={({ target: { value } }) => {
                        const updatedPlayerNames = [...playerNames];
                        updatedPlayerNames[index] = value;
                        setPlayerNames(updatedPlayerNames);
                      }}
                      onFocus={({ target }) => {
                        target.setSelectionRange(0, target.value.length);
                      }}
                      onBlur={() => {
                        localStorage.setItem(
                          "players",
                          JSON.stringify(playerNames)
                        );
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

                const totalPlayerScore =
                  scoresAsNum?.reduce((acc, curr) => acc + curr, 0) || 0;
                return (
                  <td key={index} className="p-0 m-0 border-r last:border-r-0">
                    <div
                      className={`font-bold ${
                        totalPlayerScore < 50 ? "bg-green-800" : "bg-red-700"
                      } text-white flex justify-center h-10 items-center`}
                    >
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
                        className="p-0 m-0 border-r w-1/4 last-border-r-0 border-b border-stone-400"
                      >
                        <input
                          onChange={(event) =>
                            handleOnScoreChange(event, player, scoreIndex)
                          }
                          className="h-10 w-full rounded-none text-center"
                          value={getCellScore(player, scoreIndex) || ""}
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
