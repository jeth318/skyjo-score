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
  return (
    <div
      className={`h-10 w-full border-r ${index === visiblePlayers - 1 ? "bg-red border-r-0" : ""} `}
    >
      <input
        className={`h-10   ${index === visiblePlayers - 1 ? "rounded-tr-lg" : "rounded-none"} ${index === 0 ? "rounded-tl-lg" : "rounded-none"} bg-gray-800 text-center text-white`}
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
