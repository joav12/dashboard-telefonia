import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations:[
    trigger('openClose', [
      state(
        'open',
        style({transform: 'translateX(0%)'})
      ),
      state(
        'close',
        style({transform: 'translateX(-110%)'})
      ),
      transition('open <=> closed', [animate('0.5s ease-in')])
    ]),
  ]
})
export class AppComponent {
  public title = 'dashboard-telefonica';
  public openOrClose: 'open' | 'close' = 'close';

  constructor() {}
}
