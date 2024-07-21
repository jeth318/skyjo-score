import { Dispatch, SetStateAction } from "react";

type Props = {
  index: number;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

export default function Player({ playerNames, setPlayerNames, index }: Props) {
  return (
    <div className="h-10 border first:rounded-tl-lg last:rounded-tr-lg w-full border-b-none">
      <input
        className="h-10 bg-transparent text-white text-center"
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
