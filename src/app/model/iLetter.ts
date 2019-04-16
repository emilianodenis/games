import { LetterType } from "./letter-type";

export interface ILetter {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: LetterType;
  date: Date;

  initialize(letter: ILetter): ILetter;
  clone(): ILetter;
}
