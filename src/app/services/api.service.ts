import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment-dev';
import { DELIVERY_CALCULATION_URL, DELIVERY_POINTS_URL, PACKAGE_TYPES_URL } from '../utils/constants';
import { DeliveryCalculationRequest, DeliveryCalculationResponse, DeliveryPointResponse, PackageTypeResponse } from '../utils/types';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  public getDeliveryPoints(): Observable<DeliveryPointResponse> {
    const url = environment.apiUrl + DELIVERY_POINTS_URL;
    return this._http.get<DeliveryPointResponse>(url);
  }

  public getPackageTypes(): Observable<PackageTypeResponse> {
    const url = environment.apiUrl + PACKAGE_TYPES_URL;
    return this._http.get<PackageTypeResponse>(url);
  }

  public calculatePrice(params: DeliveryCalculationRequest): Observable<DeliveryCalculationResponse> {
    const url = environment.apiUrl + DELIVERY_CALCULATION_URL;
    return this._http.post<DeliveryCalculationResponse>(url, params);
  }
}
