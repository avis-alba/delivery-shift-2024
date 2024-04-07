import { Routes } from '@angular/router';
import { DeliveryFormComponent } from './components/delivery-form/delivery-form.component';
import { DeliveryTypeComponent } from './components/delivery-type/delivery-type.component';

export const routes: Routes = [
	{ path: '', component: DeliveryFormComponent },
	{ path: 'delivery-type', component: DeliveryTypeComponent }
];
