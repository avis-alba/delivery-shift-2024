import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DeliveryPoint, PackageType } from '../../utils/types';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-form',
  standalone: true,
  imports: [
    CommonModule,
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
export class DeliveryFormComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public deliveryPoints: Array<DeliveryPoint>;
  public packageTypes: Array<PackageType>;

  private _subscriptions: Array<Subscription> = [];

  constructor(private _apiService: ApiService) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._apiService.getDeliveryPoints().subscribe(res => {
        if (res.success) {
          this.deliveryPoints = res.points;
        }
      }),

      this._apiService.getPackageTypes().subscribe(res => {
        if (res.success) {
          this.packageTypes = res.packages;
        }
      })
    );
  }

  submit() {
    console.log('submit');
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }
}
