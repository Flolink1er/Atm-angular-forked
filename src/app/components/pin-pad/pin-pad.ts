import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-pin-pad',
  imports: [MatGridList, MatButtonModule, MatGridTile],
  templateUrl: './pin-pad.html',
  styleUrl: './pin-pad.scss',
})
export class PinPad {
  public readonly tiles = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '\u2715', '0', '\u2713'];

  public pin = '';
  public checkPin = output<string>();

  handleClick(value: string): void {
    switch (value) {
      case '\u2715':
        this.pin = '';
        break;
      case '\u2713':
        if (this.pin.length === 4){
          this.checkPin.emit(this.pin);
          this.pin = ""; //pas nécessaire
        }
        break;
      default: {
        if (this.pin.length < 4) {
          this.pin += value;
        }
        break;
      }
    }
  }
}
