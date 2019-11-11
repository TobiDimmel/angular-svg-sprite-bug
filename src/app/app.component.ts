import { Component } from '@angular/core';

import icon from 'src/icons/angular.svg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  iconUrl = icon.url;
}
