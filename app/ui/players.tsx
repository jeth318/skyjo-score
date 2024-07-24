import { Dispatch, SetStateAction } from "react";

type Props = {
  index: number;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

export default function Player({ playerNames, setPlayerNames, index }: Props) {
  return (
    <div className="w-full border border-r-white">
      <input
        className="h-10 bg-slate-700 text-center text-white"
        style={{
          width: "100%",
        }}
        value={playerNames[index]}
        onChange={({ target: { value } }) => {
          const updatedPlayerNames = [...playerNames];
          updatedPlayerNames[index] = value.toUpperCase();
          setPlayerNames(updatedPlayerNames);
        }}
        onFocus={({ target }) => {
          target.setSelectionRange(0, target.value.length);
        }}
        onBlur={() => {
          localStorage.setItem("players", JSON.stringify(playerNames));
        }}
        size={1}
        maxLength={7}
        type="text"
      />
    </div>
  );
}
