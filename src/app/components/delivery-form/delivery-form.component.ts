import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './delivery-form.component.html',
  styleUrl: './delivery-form.component.scss'
})
export class DeliveryFormComponent implements OnInit {

  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {

  }

  submit() {
    console.log('submit');
  }
}
