import { ChangeEvent, FormEvent } from "react";

export const defaultScoreBoard = {
  p1: {
    score: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  },
  p2: {
    score: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  },
  p3: {
    score: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  },
  p4: {
    score: [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ],
  },
};

export function validScoreInput(event: ChangeEvent<HTMLInputElement>) {
  const { value } = event.target;
  console.log(value);

  return (
    Number.isInteger(parseInt(event.target.value)) ||
    value === "-" ||
    value === ""
  );
}

export function validScoreInputCapture(event: FormEvent<HTMLInputElement>) {
  const { value } = event.currentTarget;
  console.log(value);

  return (
    Number.isInteger(parseInt(event.currentTarget.value)) ||
    value === "-" ||
    value === ""
  );
}
