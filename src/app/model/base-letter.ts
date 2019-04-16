import { ILetter } from "src/app/model/iLetter";
import { LetterType } from "./letter-type";

export class BaseLetter implements ILetter {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: LetterType;
  date: Date;

  initialize(letter: ILetter): BaseLetter {
    this.id = letter.id;
    this.name = letter.name;
    this.description = letter.description;
    this.imageUrl = letter.imageUrl;
    this.type = letter.type;
    this.date = letter.date;
    return this;
  }

  clone(): BaseLetter {
    return new BaseLetter().initialize(this);
  }
}