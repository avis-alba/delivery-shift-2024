import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { DeliveryCalculationRequest, DeliveryPoint, PackageType } from '../../utils/types';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeliveryService } from '../../services/delivery.service';

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

  public deliveryPointsSender: Array<DeliveryPoint>;
  public deliveryPointsReceiver: Array<DeliveryPoint>;

  public packageTypes: Array<PackageType>;

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _apiService: ApiService,
    private _deliveryService: DeliveryService,
    private _router: Router
  ) {

    this.form = new FormGroup({
      senderPoint: new FormControl(null, Validators.required),
      receiverPoint: new FormControl(null, Validators.required),
      packageType: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this._apiService.getDeliveryPoints().subscribe(res => {
        if (res.success) {
          this.deliveryPoints = this.deliveryPointsSender = this.deliveryPointsReceiver = res.points;
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

    const calculationRequest: DeliveryCalculationRequest = {
      package: this.form.value.packageType,
      senderPoint: this.form.value.senderPoint,
      receiverPoint: this.form.value.receiverPoint
    }

    this._apiService.calculatePrice(calculationRequest).subscribe(res => {
      if (res.success) this._deliveryService.deliveryOptions.next(res.options);
    });

    this._router.navigate(['/delivery-type']);
  }

  change(value: DeliveryPoint, control: string): void {

    if (control === 'sender') {
      this.deliveryPointsReceiver = this.deliveryPoints.filter(point => point.id !== value.id);

    } else if (control === 'receiver') {
      this.deliveryPointsSender = this.deliveryPoints.filter(point => point.id !== value.id);
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
