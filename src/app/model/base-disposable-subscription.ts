import { Subscription } from "rxjs/internal/Subscription";


export class BaseDisposableSubscription {

    public subscriptions: Array<Subscription> = new Array<Subscription>();

    public disposeSubscriptions(): void {
        if (this.subscriptions != undefined && this.subscriptions.length > 0) {
            this.subscriptions.forEach(sub => sub.unsubscribe());
        }
    }

}