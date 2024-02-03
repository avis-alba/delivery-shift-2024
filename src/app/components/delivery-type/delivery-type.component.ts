import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Subscription } from 'rxjs';
import { DeliveryOption } from '../../utils/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delivery-type.component.html',
  styleUrl: './delivery-type.component.scss'
})
export class DeliveryTypeComponent implements OnInit, OnDestroy {

  private _subscriptions: Array<Subscription> = [];
  public deliveryOptions: Array<DeliveryOption> = [];

  constructor(
    private _deliveryService: DeliveryService
  ) { }

  ngOnInit(): void {
    this._subscriptions.push(this._deliveryService.deliveryOptions.subscribe(options => {
      if (options) this.deliveryOptions = options;

      this.deliveryOptions.forEach(option => {
        option.url = `../../../assets/img/${option.type.toLowerCase()}-icon.svg`;
        option.header = option.type === 'DEFAULT' ? 'Обычная доставка' : 'Экспресс-доставка до двери';
      })
    })
    )
  }

  setDaysLine(value: number): string {

    const lastDigit: number = value % 10;

    if (value === 1 || (value > 20 && lastDigit === 1)) return 'рабочий день'

    if ((value > 1 && value < 5) || (value > 20 && lastDigit > 1 && lastDigit < 5)) return 'рабочих дня';

    return 'рабочих дней';
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

}
