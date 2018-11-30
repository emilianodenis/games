import { ILetter } from "src/app/model/iLetter";

export class GreekLetter implements ILetter {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: LetterType;
    date: Date;
}