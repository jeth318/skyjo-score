import { Dispatch, SetStateAction } from "react";

type Props = {
  index: number;
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
};

export default function Players({ playerNames, setPlayerNames, index }: Props) {
  return (
    <th className=" border p-0 m-0">
      <input
        className="player-name h-10 bg-slate-700 text-white first:rounded-t-md last:rounded-t-md text-center"
        style={{
          width: "100%",
        }}
        placeholder="Namn"
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
    </th>
  );
}
