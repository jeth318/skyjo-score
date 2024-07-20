import { ChangeEvent } from "react";

const pattern = new RegExp(/^-?(0|[1-9]\d*)?$/);

export function valid(value: string) {
  return pattern.test(value);
}

export function getTotalScoreColor(score: number) {
  if (score < 0) return "bg-blue-800";
  if (score < 50) return "bg-green-700";
  if (score < 100) return "bg-orange-500";
  return "bg-red-700";
}

export function validScoreInput(event: ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
  console.log(pattern.test(event.target.value));
  console.log(event.target.value.length);

  return event.target.value.length <= 3 && pattern.test(event.target.value);
}
