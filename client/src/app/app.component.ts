import {AfterViewInit, Component} from '@angular/core';
import {SecurityService} from "./security/security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(private securityService: SecurityService){}

  title = 'app';

  ngAfterViewInit(): void {

  }

  public login() {
    this.securityService.login();
  }
}
