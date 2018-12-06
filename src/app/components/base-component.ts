import { BaseDisposableSubscription } from "src/app/model/base-disposable-subscription";

export class BaseComponent extends BaseDisposableSubscription {

  ngOnDestroy() {
    this.disposeSubscriptions();
  }

  public log(obj: any): void {
    console.log(obj);
  }
}