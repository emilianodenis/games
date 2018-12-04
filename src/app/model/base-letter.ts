import { ILetter } from "src/app/model/iLetter";

export class BaseLetter implements ILetter {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    type: LetterType;
    date: Date;

    clone(): ILetter {
        return <ILetter>{ ...<any>this };
    }
}