import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-landing-atm',
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  public change = output<void>();

  public nextStep(): void {
    this.change.emit();
  }
}
