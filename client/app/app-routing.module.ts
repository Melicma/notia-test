import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from "./components/login/login.component";
import {LogOrderComponent} from "./components/log-order/log-order.component";
import {OrdersComponent} from "./components/orders/orders.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'log-order/user/:ean', component: LogOrderComponent},
  { path: 'items/user/:userEan/order/:orderEan', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
