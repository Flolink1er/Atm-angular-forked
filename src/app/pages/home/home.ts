import { Component } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [MatAnchor, MatCardModule, MatChipsModule, MatProgressBarModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
