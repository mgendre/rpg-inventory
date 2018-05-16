import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LoaderService {
  private loadingState = new BehaviorSubject<boolean>(false);

  public setLoading(loading: boolean) {
    this.loadingState.next(loading);
  }

  public getLoadingState() {
    return this.loadingState;
  }
}
