import { Dispatch, SetStateAction } from "react";

type Props = {
  index: number;
  visiblePlayers: number;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

export default function Player({
  playerNames,
  setPlayerNames,
  visiblePlayers,
  index,
}: Props) {
  console.log({ playerNames, index, visiblePlayers: visiblePlayers - 1 });

  return (
    <div
      className={`h-10 w-full ${index === visiblePlayers - 1 ? "bg-red" : ""} last:rounded-tr-lg`}
    >
      <input
        className={`h-10 border border-gray-300 ${index === visiblePlayers - 1 ? "rounded-none rounded-tr-lg" : ""} ${index === 0 ? "rounded-none rounded-tl-lg" : ""} bg-gray-700  text-center text-white`}
        style={{
          width: "100%",
        }}
        placeholder="Namn"
        value={playerNames[index]}
        onChange={({ target: { value } }) => {
          const updatedPlayerNames = [...playerNames];
          updatedPlayerNames[index] = value.toUpperCase();
          setPlayerNames(updatedPlayerNames);
          localStorage.setItem("players", JSON.stringify(updatedPlayerNames));
        }}
        onFocus={({ target }) => {
          target.setSelectionRange(0, target.value.length);
        }}
        size={1}
        maxLength={7}
        type="text"
      />
    </div>
  );
}
