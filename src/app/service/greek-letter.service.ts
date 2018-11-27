import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { delay } from "rxjs/operators";
import { ICardTest } from "src/app/model/iCardTest";

@Injectable()
export class GreekLetterService {

    private card1 = <ICardTest>{
        name: "alpha",
        description: "Le A grec",
        imageUrl: "https://cdn1.iconfinder.com/data/icons/ringtone-music-instruments/512/sigma-symbol-greek-alphabet-letter-3-512.png",
        type: "base"
    };

    private card2 = <ICardTest>{
        name: "beta",
        description: "Pas vraiment brillant",
        imageUrl: "https://png.pngtree.com/svg/20170622/beta_66473.png",
        type: "alt"
    };

    private card3 = <ICardTest>{
        name: "gamma",
        description: "C'est comme le G",
        imageUrl: "https://cdn1.iconfinder.com/data/icons/electricity-and-functional-elements/512/gamma-symbol-letter-greek-alphabet-512.png",
        type: "base"
    };

    private card4 = <ICardTest>{
        name: "delta",
        description: "C'est un triangle",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/Greek_uc_delta.png",
        type: "alt"
    };

    private card5 = <ICardTest>{
        name: "epsilon",
        description: "Euhhhhhh",
        imageUrl: "https://banner2.kisspng.com/20180406/ukq/kisspng-epsilon-greek-alphabet-koppa-letter-string-5ac76f2bda5d76.1915839615230195638944.jpg",
        type: "base"
    };

    private card6 = <ICardTest>{
        name: "Iota",
        description: "Très petit i",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Iota_uc_lc.svg/1200px-Iota_uc_lc.svg.png",
        type: "alt"
    };

    private card7 = <ICardTest>{
        name: "Omicron",
        description: "premiere description",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Omicron_uc_lc.svg/1200px-Omicron_uc_lc.svg.png",
        type: "base"
    };

    private card8 = <ICardTest>{
        name: "Upsilon",
        description: "20e lettre de l'alphabet grec, précédée par tau et suivie par phi.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Upsilon_uc_lc.svg/langfr-1920px-Upsilon_uc_lc.svg.png",
        type: "alt"
    };

    private card9 = <ICardTest>{
        name: "Omega",
        description: "On dit que c'est le plus grand",
        imageUrl: "https://cdn0.iconfinder.com/data/icons/mathematics-geometry/512/omega-greek-alphabet-letter-512.png",
        type: "base"
    };

    //
    private cards: ICardTest[] = [
        this.card1, this.card2, this.card3, this.card4, this.card5, this.card6, this.card7, this.card8, this.card9
    ]

    public getCards(): Observable<ICardTest[]> {
        let obs = of(this.cards);
        return obs.pipe(delay(750));
    }

}