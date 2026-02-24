import { Card } from "../card";
import { Customer } from "../customers";
import { BankType } from "../enums/bankType";
import { CardType } from "../enums/cardType";
import { Gender } from "../enums/gender";

const card1_c1 = new Card(
  '0138 0319 1093 1031',
  '1234',
  1000,
  CardType.MASTERCARD,
  BankType.BELFIUS,
)

const card2_c1 = new Card(
  '0183 4389 4276 4652',
  '1234',
  1000,
  CardType.VISA,
  BankType.REVOLUT,
)

const card1_c2 = new Card(
  '1982 0198 1029 1876',
  '1234',
  10000,
  CardType.OTHER,
  BankType.BELFIUS,
)

const card2_c2 = new Card(
  '2151 1309 2460 0139',
  '1234',
  10000,
  CardType.MASTERCARD,
  BankType.ING,
)

const customer1 = new Customer(
  'John',
  'Doe',
  Gender.HOMME,
  new Date('01-01-1990'),
  'Rue des blabla 94',
  [card1_c1, card2_c1]
);

const customer2 = new Customer(
  'Lucie',
  'Smith',
  Gender.FEMME,
  new Date('01-01-1990'),
  'Boulevard des soupirs 220',
  [card1_c2, card2_c2]
);

export const CUSTOMERS: Customer[] = [customer1, customer2];

