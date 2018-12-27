import { Subscription } from "rxjs/internal/Subscription";


export class BaseDisposableSubscription {

    private mapSubscriptions: Map<any, Subscription> = new Map();

    public addSubcription(key: any, subscription: Subscription): void {
        if (key == undefined)
            return;

        let sub = this.mapSubscriptions.get(key);
        if (sub != undefined) {
            sub.unsubscribe();
            this.mapSubscriptions.delete(key);
        }
        this.mapSubscriptions.set(key, subscription);
    }

    public removeSubscription(key: any): void {
        if (key == undefined)
            return;
        let sub = this.mapSubscriptions.get(key);
        if (sub != undefined) {
            sub.unsubscribe();
            this.mapSubscriptions.delete(key);
        }
    }

    public subscriptions: Array<Subscription> = new Array<Subscription>();

    public disposeSubscriptions(): void {
        if (this.subscriptions != undefined && this.subscriptions.length > 0) {
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }

        if (this.mapSubscriptions.size > 0) {
            this.mapSubscriptions
                .forEach((x, y) => y.unsubscribe());
            this.mapSubscriptions.clear();
        }
    }

}