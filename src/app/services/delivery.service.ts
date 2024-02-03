import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DeliveryOption } from '../utils/types';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  public deliveryOptions: BehaviorSubject<DeliveryOption[]> = new BehaviorSubject(null);

  constructor() { }
}
