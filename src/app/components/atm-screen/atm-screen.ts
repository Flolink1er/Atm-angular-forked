import { Component } from '@angular/core';
import { PinPad } from '../pin-pad/pin-pad';
import { SelectAction } from '../select-action/select-action';
import { SelectCard } from '../select-card/select-card';
import { AtmSteps } from '../../models/enums/atm-steps';
import { Landing } from '../landing/landing';
import { Card } from '../../models/card';
import { CUSTOMERS } from '../../models/data/customers.mock';

@Component({
  selector: 'app-atm-screen',
  imports: [PinPad, SelectAction, SelectCard, Landing ],
  templateUrl: './atm-screen.html',
  styleUrl: './atm-screen.scss',
})
export class AtmScreen {
  public readonly AtmSteps = AtmSteps;
  public currentStep = AtmSteps.MACHINE_HOME;
  public currentCard?: Card;
  public error_msg?: string;

  public nextStep(nextStep : AtmSteps): void {
    this.currentStep = nextStep;

    if (nextStep === AtmSteps.MACHINE_HOME){
      this.currentCard = undefined;
    }
  }

  public pickCard(card : Card): void{
    this.currentCard = card;
    this.nextStep(AtmSteps.PIN_CHECK);
  }

  public checkPin(pin: string): void{
    if (this.currentCard?.checkPin(pin)){
      this.error_msg = undefined;
      this.nextStep(AtmSteps.SELECT_ACTION);
    }else{
      this.error_msg = "Mauvais code PIN !";
    }
  }
}
