import { ChangeDetectionStrategy, Component, effect, output, signal, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../../models/customers';
import { Gender } from '../../models/enums/gender';
import { MatAnchor } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ListSteps } from '../../models/enums/list-steps';
import { MatTreeModule } from '@angular/material/tree';
import { Card } from '../../models/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-landing-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatAnchor, MatIconModule, MatTreeModule, MatListModule, MatExpansionModule],
  templateUrl: './landing-list.html',
  styleUrl: './landing-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingList {
  public readonly displayedColumns: string[] = ['clients', 'cards'];
  public dataSource!: MatTableDataSource<Customer>;
  public changeStep = output<ListSteps>();
  public customerList ?: Customer[];
  public openedPanels = signal<Record<string, number | null>>({});


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(){
    /*créer déjà des clients ainsi que leurs cartes
    const cust1: Customer = new Customer('Jean', 'Passe', Gender.HOMME, new Date('12-10-1976'), 'Rue de la loi 109', []);
    const cust2: Customer = new Customer('Sarah', 'Compagne', Gender.FEMME, new Date('30-05-1988'), 'Boulevard du lion 304', []);
    const cust3: Customer = new Customer('Truc', 'Muche', Gender.AUTRE, new Date('14-07-1990'), 'Rue du pré 12', []);

    const customers: Customer[] = [cust1, cust2, cust3];
    this.dataSource = new MatTableDataSource(customers);
    */

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
      this.dataSource = new MatTableDataSource(customers);
      });
  }

  public setOpenedIndex(fullname: string, index: number) {
    this.openedPanels.update(state => ({
    ...state,
    [fullname]: index
    }));
  }

  public isOpened(fullname: string, index: number) {
    return this.openedPanels()[fullname] === index;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public createUser(){
    this.changeStep.emit(ListSteps.CREATE_USER);
  }

  public createCard(){
    this.changeStep.emit(ListSteps.CREATE_CARD);
  }
}
