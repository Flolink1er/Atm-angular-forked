import { ChangeDetectionStrategy, Component, effect, input, output, signal, ViewChild } from '@angular/core';
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
  public customerList = input<Customer[]>([]);
  public updateCustomerList = output<Customer[]>();
  public openedPanels = signal<Record<string, number | null>>({});


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  public ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.customerList());
  }

  public setOpenedIndex(fullname: string, index: number): void {
    this.openedPanels.update(state => ({
    ...state,
    [fullname]: index
    }));
  }

  public isOpened(fullname: string, index: number): boolean {
    return this.openedPanels()[fullname] === index;
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public createUser(): void{
    this.changeStep.emit(ListSteps.CREATE_USER);
  }

  public createCard(): void{
    this.changeStep.emit(ListSteps.CREATE_CARD);
  }

  public card_del(card: Card, customer: Customer): void {

  const updated = this.customerList()!.map(c => {

    if (c.fullname !== customer.fullname) return c;

    return new Customer(
      c['_firstName'],
      c['_lastName'],
      c['_gender'],
      c['_birthDate'],
      c['_address'],
      c.cards.filter(el => el.cardNumber !== card.cardNumber)
    );
  });

  this.dataSource.data = this.customerList();
  this.updateCustomerList.emit(updated);
}
}
