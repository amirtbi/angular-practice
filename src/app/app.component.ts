import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
