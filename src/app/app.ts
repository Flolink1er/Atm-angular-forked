<<<<<<< HEAD
import { Component, signal } from '@angular/core';
=======
import { Component } from '@angular/core';
import { Toolbar } from './components/toolbar/toolbar';
>>>>>>> oldrepo/main
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet],
=======
  imports: [Toolbar, RouterOutlet],
>>>>>>> oldrepo/main
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
<<<<<<< HEAD
  protected readonly title = signal('atm');
=======
  public readonly appName = "My super ATM App !"
>>>>>>> oldrepo/main
}
