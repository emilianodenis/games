
export class BaseTile {

    public get id(): number {
        return this._id;
    }

    constructor(
        private readonly _id?: number,
    ) {

    }
}