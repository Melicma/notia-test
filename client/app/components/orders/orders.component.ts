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
  private m_amount = 0;
  private m_maxAmount = 0;
  private m_itemEan = 0;
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
      }, err => {
        console.log(err);
      }
    );
  }

  packItem(item) {
    if (item.amount > 1) {
      this.m_maxAmount = item.amount;
      this.m_itemEan = item.ean;
      const modal = document.getElementById('myModal');

      modal.style.display = 'block';

      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

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

  exit(){
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  update() {
    // this.m_http.put('/api/orders/' + this.m_itemEan, [ this.m_amount, this.m_userEan.toString()]).subscribe(
    //   (data: APIResponse) => {
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    window.location.reload();
  }

}


