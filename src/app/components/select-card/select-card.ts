import { Component, effect, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CUSTOMERS } from '../../models/data/customers.mock';
import { Customer } from '../../models/customers';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../../models/card';

@Component({
  selector: 'app-select-card',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatCardModule],
  templateUrl: './select-card.html',
  styleUrl: './select-card.scss',
})
export class SelectCard {
  public change = output();
  public customers ?: Customer[];
  public cardPicked = output<Card>();

  constructor(){
    effect(() =>{
      var customers: Customer[];
      if (localStorage.getItem('customerList') !== null){
        let raw = JSON.parse(localStorage.getItem('customerList')!)
        customers = raw.map((data: Customer) => {
          const customer = Customer.fromJson(data);
          customer.formatCards(customer.cards.map(Card.fromJson));
          return customer;
        });


      }else{
        customers= [];
      }

      this.customers = customers;
      });
  }

  public chooseCard(card : Card): void{
    this.cardPicked.emit(card);
  }
}
