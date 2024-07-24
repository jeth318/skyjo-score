"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import TotalScore from "./ui/total-score";
import ScoreRow from "./ui/score-row";
import { validScoreInput } from "./lib/utils";
import Player from "./ui/player";

export default function Home() {
  const [playersVisible, setPlayersVisible] = useState(4);
  const defaultScore = ["", "", "", "", "", "", "", "", "", ""];
  const [playerNames, setPlayerNames] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [hasLoadedPlayers, setHasLoadedPlayers] = useState(false);
  const [hasLoadedScores, setHasLoadedScores] = useState(false);

  const [playerOneScore, setPlayerOneScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerTwoScore, setPlayerTwoScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerThreeScore, setPlayerThreeScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerFourScore, setPlayerFourScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerFiveScore, setPlayerFiveScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerSixScore, setPlayerSixScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerSevenScore, setPlayerSevenScore] =
    useState<(number | string)[]>(defaultScore);
  const [playerEightScore, setPlayerEightScore] =
    useState<(number | string)[]>(defaultScore);

  const visiblePlayersAsArray = [...Array(playersVisible).keys()];
  const scoreRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function getPlayerScoreSetter(index: number) {
    switch (index) {
      case 0:
        return {
          setter: setPlayerOneScore,
          score: playerOneScore,
        };
      case 1:
        return {
          setter: setPlayerTwoScore,
          score: playerTwoScore,
        };
      case 2:
        return {
          setter: setPlayerThreeScore,
          score: playerThreeScore,
        };
      case 3:
        return {
          setter: setPlayerFourScore,
          score: playerFourScore,
        };
      case 4:
        return {
          setter: setPlayerFiveScore,
          score: playerFiveScore,
        };
      case 5:
        return {
          setter: setPlayerSixScore,
          score: playerSixScore,
        };
      case 6:
        return {
          setter: setPlayerSevenScore,
          score: playerSevenScore,
        };
      case 7:
        return {
          setter: setPlayerEightScore,
          score: playerEightScore,
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
      playerFiveScore,
      playerSixScore,
      playerSevenScore,
      playerEightScore,
    ];

    currentGameState[player] = updatedScore;
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
      setPlayerFiveScore(scores[4]);
      setPlayerSixScore(scores[5]);
      setPlayerSevenScore(scores[6]);
      setPlayerEightScore(scores[7]);
    }
    setHasLoadedScores(true);
  }

  function loadStoragePlayers() {
    const savedPlayersState = localStorage.getItem("players");
    if (savedPlayersState) {
      setPlayerNames(() => JSON.parse(savedPlayersState));
    }
    setHasLoadedPlayers(true);
  }

  function loadPlayersVisible() {
    const savedPlayersVisible = localStorage.getItem("players-visible");
    if (savedPlayersVisible) {
      setPlayersVisible(parseInt(savedPlayersVisible));
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
        setPlayerFiveScore(defaultScore);
        setPlayerSixScore(defaultScore);
        setPlayerSevenScore(defaultScore);
        setPlayerEightScore(defaultScore);
      }
    }
  }

  useEffect(() => {
    loadStoragePlayers();
    loadStorageScore();
    loadPlayersVisible();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-3 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 p-2">
      <div className="flex gap-2 text-white">
        <h1 className="text-white m-0 p-0 text-2xl w-full font-extrabold">
          <i>SKYJO SCORE</i>
        </h1>
        <button
          type="button"
          onClick={handleOnReset}
          className="btn btn-neutral btn-sm shadow-lg"
        >
          Börja om
        </button>
      </div>
      <div className="flex flex-row items-center gap-2 text-white">
        <label htmlFor="player-count">Spelare</label>
        <select
          value={playersVisible}
          onChange={(e) => {
            setPlayersVisible(parseInt(e.target.value));
            localStorage.setItem("players-visible", e.target.value);
          }}
          name="player-count"
          id="player-count"
          className="w-18 text-black select select-sm select-bordered"
        >
          <option>2</option>
          <option>3</option>
          <option defaultValue={4}>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
        </select>
      </div>
      <div className="flex w-full justify-between">
        <div className="shadow-lg">
          <div className="flex flex-col">
            <div className="flex justify-between">
              {visiblePlayersAsArray.map((index) => {
                return (
                  <Player
                    visiblePlayers={playersVisible}
                    key={`player-${index}`}
                    index={index}
                    playerNames={playerNames}
                    setPlayerNames={setPlayerNames}
                  />
                );
              })}
            </div>
            <div className="flex justify-between">
              {visiblePlayersAsArray.map((player) => {
                const { score } = getPlayerScoreSetter(player);
                return (
                  <TotalScore
                    key={`total-score-${player}`}
                    score={score}
                    hasLoadedScores={hasLoadedScores}
                  />
                );
              })}
            </div>
            {scoreRows.map((_, scoreIndex) => {
              return (
                <div
                  key={`row-${scoreIndex}`}
                  className="flex h-10 border-none"
                >
                  <ScoreRow
                    players={visiblePlayersAsArray}
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
