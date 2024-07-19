"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import TotalScore from "./ui/total-score";
import ScoreRow from "./ui/score-row";
import { validScoreInput } from "./lib/utils";
import Player from "./ui/player";

export default function Home() {
  const defaultScore = ["", "", "", "", "", "", "", "", "", ""];
  const [playerNames, setPlayerNames] = useState(["", "", "", ""]);

  const [playerOneScore, setPlayerOneScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerTwoScore, setPlayerTwoScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerThreeScore, setPlayerThreeScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerFourScore, setPlayerFourScore] =
    useState<(number | string)[]>(defaultScore);

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

  function saveScoreToStorage(
    player: number,
    updatedScore: (number | string)[]
  ) {
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

      setPlayerOneScore(scores[0]);
      setPlayerTwoScore(scores[1]);
      setPlayerThreeScore(scores[2]);
      setPlayerFourScore(scores[3]);
    }
  }

  function loadStoragePlayers() {
    const savedPlayersState = localStorage.getItem("players");
    if (savedPlayersState) {
      setPlayerNames(JSON.parse(savedPlayersState));
    }
  }

  function getCellScore(player: number, cellIndex: number) {
    const { score } = getPlayerScoreSetter(player);
    return score?.[cellIndex] || "";
  }

  function handleOnScoreChange(
    event: ChangeEvent<HTMLInputElement>,
    player: number,
    scoreIndex: number
  ) {
    if (validScoreInput(event)) {
      const { setter, score = [] } = getPlayerScoreSetter(player);
      const updatedScore = [...score];
      updatedScore[scoreIndex] = event.target.value;
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
    <main className="flex flex-col min-h-screen p-2 bg-gradient-to-b gap-8   from-indigo-500 via-purple-500  to-pink-500">
      <div className="flex justify-between items-center text-white">
        <h1 className="text-2xl font-extrabold p-0 m-0">
          <i>SKYJO SCORE</i>
        </h1>
        <button
          type="button"
          onClick={handleOnReset}
          className="btn btn-sm btn-neutral shadow-lg"
        >
          Börja om
        </button>
      </div>
      <div className="flex justify-between w-full">
        <div className="shadow-lg">
          <div className="flex flex-col">
            <div className="flex justify-between">
              {playerNames.map((_, index) => {
                return (
                  <Player
                    key={`player-${index}`}
                    index={index}
                    playerNames={playerNames}
                    setPlayerNames={setPlayerNames}
                  />
                );
              })}
            </div>
            <div className="flex justify-between">
              {[1, 2, 3, 4].map((index) => {
                const { score } = getPlayerScoreSetter(index);
                return (
                  <TotalScore key={`total-score-${index}`} score={score} />
                );
              })}
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, scoreIndex) => {
              return (
                <div key={`row-${scoreIndex}`} className="border-none flex">
                  <ScoreRow
                    getCellScore={getCellScore}
                    handleOnScoreChange={handleOnScoreChange}
                    scoreIndex={scoreIndex}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
