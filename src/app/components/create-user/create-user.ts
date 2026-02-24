import { Component, output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatAnchor } from "@angular/material/button";
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption } from "@angular/material/select";
import { Gender } from '../../models/enums/gender';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../models/customers';

@Component({
  selector: 'app-create-user',
  imports: [MatFormFieldModule, MatIconModule, MatAnchor, ReactiveFormsModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelect, MatOption, MatDatepickerModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateUser {
  public readonly Gender = Gender;
  public user = output<Customer>();
  public readonly newUser = new FormGroup({
    firstName : new FormControl('', Validators.required),
    lastName : new FormControl('', Validators.required),
    gender : new FormControl(Gender.FEMME, Validators.required),
    birthdate : new FormControl(new Date, Validators.required),
    address : new FormControl('', Validators.required),
  })

  public create(){
    const newCust = new Customer(
      this.newUser.get('firstName')!.value!,
      this.newUser.get('lastName')!.value!,
      this.newUser.get('gender')!.value!,
      this.newUser.get('birthdate')!.value!,
      this.newUser.get('address')!.value!,
      []
    )

    this.user.emit(newCust);
  }
}
