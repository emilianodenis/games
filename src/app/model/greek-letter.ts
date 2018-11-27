import { ICardTest } from "src/app/model/iCardTest";

export class GreekLetter implements ICardTest {
    name: string;
    description: string;
    imageUrl: string;
    type: LetterType;
}