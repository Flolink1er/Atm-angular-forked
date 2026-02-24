import { Component, effect, output } from '@angular/core';
import { MatFormFieldControl, MatFormFieldModule } from "@angular/material/form-field";
import { MatSelect, MatOption } from "@angular/material/select";
import { CardType } from '../../models/enums/cardType';
import { BankType } from '../../models/enums/bankType';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Card } from '../../models/card';
import { Customer } from '../../models/customers';
import { MatInput } from '@angular/material/input';
import { matchValidator } from '../select-action/select-action';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-create-card',
  imports: [MatFormFieldModule, MatSelect, MatOption, ReactiveFormsModule, FormsModule, MatInput, MatButton],
  templateUrl: './create-card.html',
  styleUrl: './create-card.scss',
})
export class CreateCard {
  public readonly cardType = CardType;
  public readonly bankType = BankType;
  public readonly card = output<{card : Card, customer : Customer}>();
  public customersList ?: Customer[];
  public readonly newCardForm = new FormGroup({
    cardCustomer : new FormControl<Customer | null>(null, Validators.required),
    cardNumber : new FormControl('', [Validators.required, Validators.pattern("^\\d{4}(?:[ \\u00A0]?\\d{4}){3}$")]),
    cardPin : new FormControl('', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(4), Validators.maxLength(4), matchValidator('cardPinConfirm', true)]),
    cardPinConfirm : new FormControl('', [Validators.required, Validators.pattern("[0-9]+"), Validators.minLength(4), Validators.maxLength(4), matchValidator('cardPin')]),
    cardType : new FormControl(CardType.MASTERCARD, Validators.required),
    cardBank : new FormControl(BankType.BELFIUS, Validators.required),
  })

  constructor(){
    effect(() =>{
      var customers: Customer[];
      if (localStorage.getItem('customerList') !== null){
        let raw = JSON.parse(localStorage.getItem('customerList')!)
        customers = raw.map(Customer.fromJson);

      }else{
        customers= [];
      }

      this.customersList = customers;
      });
  }

  public create(){
    const cardCreated = new Card(
          this.newCardForm.get('cardNumber')!.value!.replace(/\D+/g, '').replace(/(\d{4})(?=\d)/g, '$1 '),
          this.newCardForm.get('cardPin')!.value!,
          0,
          this.newCardForm.get('cardType')!.value!,
          this.newCardForm.get('cardBank')!.value!,
        )
    const cardInfo = { card : cardCreated, customer : this.newCardForm.get('cardCustomer')!.value!}

    this.card.emit(cardInfo);
  }

}
