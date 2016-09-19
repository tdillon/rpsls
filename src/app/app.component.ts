import { Component } from '@angular/core';
import R from 'rpsls'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = R.play(R.ROCK, R.SPOCK).result;
}
