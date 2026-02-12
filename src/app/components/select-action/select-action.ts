import { ChangeDetectionStrategy, Component, effect, inject, input, LOCALE_ID, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { Card } from '../../models/card';
import { CurrencyPipe } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

export function isMultiple(num: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = Number(control.value);
    return value % num === 0 ? null : { isMultiple: {value: control.value}};
  }
}

export function matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;

    if (!parent) return null;
    const matchControl = parent.get(matchTo);

    if (reverse) {
      matchControl?.updateValueAndValidity();
      return null;
    }

    return control.value === matchControl?.value ? null : { matching: true };
  };
}


@Component({
  selector: 'app-select-action',
  imports: [MatButtonModule, MatIconModule, MatExpansionModule, CurrencyPipe, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './select-action.html',
  styleUrl: './select-action.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAction {
  public action = output<void>();
  public readonly selectedCard = input.required<Card>();
  public accordion = viewChild.required(MatAccordion);
  public panelStep = signal(0);
  public readonly withdrawal = new FormControl(null, [Validators.required, Validators.min(5), isMultiple(5)]);
  public readonly deposit = new FormControl(null, [Validators.required, Validators.min(5), isMultiple(5)]);
  public readonly changePIN = new FormGroup({
    newPin : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), matchValidator('confirmator', true)]),
    confirmator: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), matchValidator('newPin')]),
  })
  private _snackBar = inject(MatSnackBar);
  private withdrawMaxValidationRef? : ValidatorFn

  constructor(){
    effect(() =>{
      this.updateValidatorMax();
    })
  }

  public handleWithdrawal(): void{
    this.selectedCard().withdraw(this.withdrawal.value!);
    this.withdrawal.reset();
    this._snackBar.open('Le retrait est bien validé !', '', {verticalPosition: 'top', duration: 2000})
    this.updateValidatorMax();
  }

  public handleDeposit(): void{
    this.selectedCard().deposit(this.deposit.value!);
    this.deposit.reset();
    this._snackBar.open('Le dépot est bien validé !', '', {verticalPosition: 'top', duration: 2000})
    this.updateValidatorMax();
  }

  public handleNewPin(): void{
    this.selectedCard().pin = this.changePIN.value.newPin!;
    this.changePIN.reset();
    this._snackBar.open('Le code pin a bien été changé !', '', {verticalPosition: 'top', duration: 2000})
  }

  private updateValidatorMax(): void{
    if(this.withdrawMaxValidationRef){
      this.withdrawal.removeValidators(this.withdrawMaxValidationRef);
    }
    this.withdrawMaxValidationRef = Validators.max(this.selectedCard().cardBalance)
    this.withdrawal.addValidators(this.withdrawMaxValidationRef);
    this.withdrawal.updateValueAndValidity();
  }

  public setStep(index: number) {
    this.panelStep.set(index);
  }

  public exit(): void{
    this.action.emit();
  }

}
