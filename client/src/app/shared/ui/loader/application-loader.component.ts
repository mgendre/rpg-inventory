import {Component, OnDestroy, OnInit} from "@angular/core";
import {LoaderService} from "./loader.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'rpgi-application-loader',
  template: `
    <div class="application-loader"
         *ngIf="loading">
      <div class="backdrop"></div>
      <div class="loader-container">
        <div class="loader">
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
          <span class="loader-block"></span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./application-loader.component.scss']
})
export class ApplicationLoaderComponent implements OnInit, OnDestroy {

  loading = false;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.loaderService.getLoadingState().subscribe((state) => {
      this.loading = state;
    });
  }
}
