import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { ListSteps } from '../../models/enums/list-steps';
import { LandingList } from '../landing-list/landing-list';
import { CreateUser } from '../create-user/create-user';
import { CreateCard } from '../create-card/create-card';
import { Customer } from '../../models/customers';
import { Card } from '../../models/card';

@Component({
  selector: 'app-list-screen',
  imports: [LandingList, CreateUser, CreateCard],
  templateUrl: './list-screen.html',
  styleUrl: './list-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListScreen {
  public readonly ListSteps = ListSteps;
  public currentStep = ListSteps.LIST_HOME;
  public customerList ?: Customer[];

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

      this.customerList = customers;
      });
  }

  public changeStep(step: ListSteps): void{
    this.currentStep = step;
  }

  public createCust(newUser: Customer): void{
    var customerList : Customer[];
    if (!localStorage.getItem('customerList')){
      customerList = [newUser];
    }else{
      let raw = JSON.parse(localStorage.getItem('customerList')!)
      this.customerList = raw.map(Customer.fromJson);
      this.customerList!.push(newUser);
    }

    localStorage.setItem('customerList', JSON.stringify(this.customerList));
    this.changeStep(ListSteps.LIST_HOME);
  }

  public createCard(newCard: {card : Card, customer : Customer}){
    const customerTarget : Customer = newCard['customer'];
    const cardTarget : Card = newCard['card'];
    for (const cust of this.customerList!){
      if (cust.fullname == customerTarget.fullname){
        cust.addCard(cardTarget);
      }
    }
    localStorage.setItem('customerList', JSON.stringify(this.customerList));
    this.changeStep(ListSteps.LIST_HOME);

  }
}
