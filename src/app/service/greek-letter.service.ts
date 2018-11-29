import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { delay } from "rxjs/operators";
import { ILetter } from "src/app/model/iLetter";

@Injectable()
export class GreekLetterService {

    private letter1 = <ILetter>{
        id: 1,
        name: "alpha",
        description: "Le A grec",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Alpha_uc_lc.svg/langfr-125px-Alpha_uc_lc.svg.png",
        type: "base"
    };

    private letter2 = <ILetter>{
        id: 2,
        name: "beta",
        description: "Pas vraiment brillant",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Beta_uc_lc.svg/langfr-125px-Beta_uc_lc.svg.png",
        type: "alt"
    };

    private letter3 = <ILetter>{
        id: 3,
        name: "gamma",
        description: "C'est comme le G",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gamma_uc_lc.svg/langfr-125px-Gamma_uc_lc.svg.png",
        type: "base"
    };

    private letter4 = <ILetter>{
        id: 4,
        name: "delta",
        description: "C'est un triangle",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Delta_uc_lc.svg/langfr-125px-Delta_uc_lc.svg.png",
        type: "alt"
    };

    private letter5 = <ILetter>{
        id: 5,
        name: "epsilon",
        description: "Euhhhhhh",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Epsilon_uc_lc.svg/langfr-125px-Epsilon_uc_lc.svg.png",
        type: "base"
    };

    private letter6 = <ILetter>{
        id: 9,
        name: "Iota",
        description: "Très petit i",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Iota_uc_lc.svg/langfr-125px-Iota_uc_lc.svg.png",
        type: "alt"
    };

    private letter7 = <ILetter>{
        id: 15,
        name: "Omicron",
        description: "premiere description",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Omicron_uc_lc.svg/langfr-125px-Omicron_uc_lc.svg.png",
        type: "base"
    };

    private letter8 = <ILetter>{
        id: 20,
        name: "Upsilon",
        description: "20e lettre de l'alphabet grec, précédée par tau et suivie par phi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Upsilon_uc_lc.svg/langfr-125px-Upsilon_uc_lc.svg.png",
        type: "alt"
    };

    private card9 = <ILetter>{
        id: 24,
        name: "Omega",
        description: "On dit que c'est le plus grand",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Omega_uc_lc.svg/langfr-125px-Omega_uc_lc.svg.png",
        type: "base"
    };

    private letters: ILetter[] = [
        this.letter1, this.letter2, this.letter3, this.letter4, this.letter5, this.letter6, this.letter7, this.letter8, this.card9
    ]

    public getCards(): Observable<ILetter[]> {
        let obs = of(this.letters);
        return obs.pipe(delay(750));
    }

}