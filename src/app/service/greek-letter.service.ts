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
        imageUrl: "https://cdn1.iconfinder.com/data/icons/ringtone-music-instruments/512/sigma-symbol-greek-alphabet-letter-3-512.png",
        type: "base"
    };

    private letter2 = <ILetter>{
        id: 2,
        name: "beta",
        description: "Pas vraiment brillant",
        imageUrl: "https://png.pngtree.com/svg/20170622/beta_66473.png",
        type: "alt"
    };

    private letter3 = <ILetter>{
        id: 3,
        name: "gamma",
        description: "C'est comme le G",
        imageUrl: "https://cdn1.iconfinder.com/data/icons/electricity-and-functional-elements/512/gamma-symbol-letter-greek-alphabet-512.png",
        type: "base"
    };

    private letter4 = <ILetter>{
        id: 4,
        name: "delta",
        description: "C'est un triangle",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Greek_uc_delta.png",
        type: "alt"
    };

    private letter5 = <ILetter>{
        id: 5,
        name: "epsilon",
        description: "Euhhhhhh",
        imageUrl: "https://banner2.kisspng.com/20180406/ukq/kisspng-epsilon-greek-alphabet-koppa-letter-string-5ac76f2bda5d76.1915839615230195638944.jpg",
        type: "base"
    };

    private letter6 = <ILetter>{
        id: 9,
        name: "Iota",
        description: "Très petit i",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Iota_uc_lc.svg/1200px-Iota_uc_lc.svg.png",
        type: "alt"
    };

    private letter7 = <ILetter>{
        id: 15,
        name: "Omicron",
        description: "premiere description",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Omicron_uc_lc.svg/1200px-Omicron_uc_lc.svg.png",
        type: "base"
    };

    private letter8 = <ILetter>{
        id: 20,
        name: "Upsilon",
        description: "20e lettre de l'alphabet grec, précédée par tau et suivie par phi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Upsilon_uc_lc.svg/langfr-1920px-Upsilon_uc_lc.svg.png",
        type: "alt"
    };

    private card9 = <ILetter>{
        id: 24,
        name: "Omega",
        description: "On dit que c'est le plus grand",
        imageUrl: "https://cdn0.iconfinder.com/data/icons/mathematics-geometry/512/omega-greek-alphabet-letter-512.png",
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