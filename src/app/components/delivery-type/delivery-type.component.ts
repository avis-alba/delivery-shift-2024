import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DeliveryService } from '../../services/delivery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.scss'
})
export class DeliveryTypeComponent implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = [];

  constructor(
    private _apiService: ApiService,
    private _deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this._subscriptions.push(this._deliveryService.deliveryOptions.subscribe(options => {
      if (options) console.log('options', options);
    })
    )
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

}
