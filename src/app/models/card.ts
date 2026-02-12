import { BankType } from "./enums/bankType";
import { CardType } from "./enums/cardType";

export class Card {
  private readonly _cardNumber: string;
  private _pin: string;
  private _balance: number;
  private readonly _type: CardType;
  private readonly _bank: BankType;


  constructor(
    cardNumber: string,
    pin: string,
    balance: number,
    type: CardType,
    bank: BankType
  ) {
    this._cardNumber = cardNumber;
    this._pin = pin;
    this._balance = balance;
    this._type = type;
    this._bank = bank;
  }

  public get cardNumber(): string{
    return this._cardNumber;
  }

  public get cardType(): CardType{
    return this._type;
  }

  public get cardBank(): BankType{
    return this._bank;
  }

  public get cardPin(): string{
    return this._pin;
  }

  public get cardBalance(): number{
    return this._balance;
  }

  public set pin(newPin: string){
    this._pin = newPin;
  }

  public checkPin(pin: string): boolean{
    return this._pin === pin;
  }

  public deposit(amount: number): void{
    if(amount > 0){
      this._balance += amount;
    }else{
      throw new Error('Le montant déposé doit être positif');
    }
  }

  public withdraw(amount: number){
    if(amount > 0 && this._balance >= amount){
      this._balance -= amount;
    }
    else if(this._balance < amount){
      throw new Error('Votre solde est insuffisant');
    }
    else{
      throw new Error('Le montant retrait doit être positif');
    }
  }

}
