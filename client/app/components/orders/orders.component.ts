import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {APIResponse} from '../../interfaces/api-response.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private m_userEan = 0;
  private m_orderEan = 0;
  private m_items = [];
  constructor(private m_http: HttpClient, private m_actRoute: ActivatedRoute, private m_route: Router) { }

  ngOnInit() {
    this.m_actRoute.params.subscribe(
      params => {
        this.m_userEan = params['userEan'];
        this.m_orderEan = params['orderEan'];
      }
    );
    this.m_http.get('/api/orders/' + this.m_orderEan).subscribe(
      (data: APIResponse) => {
        this.m_items = data.result;
        console.log(this.m_items);
      }, err => {
        console.log(err);
      }
    );
  }

  packItem(item) {
    if (item.amount > 1) {
      console.log('Velke mnozstvi');
    } else {
      this.m_http.put('/api/orders/' + item.ean, [ 1, this.m_userEan.toString()]).subscribe(
        (data: APIResponse) => {
        },
        err => {
          console.log(err);
        }
      );
    }
    // window.location.reload();
  }

}


