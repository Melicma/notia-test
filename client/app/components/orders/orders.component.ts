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
  private m_user = {};
  private m_complete = false;
  private m_item;
  constructor(private m_http: HttpClient, private m_actRoute: ActivatedRoute, private m_router: Router) { }

  ngOnInit() {
    this.m_actRoute.params.subscribe(
      params => {
        this.m_userEan = params['userEan'];
        this.m_orderEan = params['orderEan'];
      }
    );
    this.m_http.get('/api/orders/' + this.m_orderEan).subscribe(
      (data: APIResponse) => {
        for (const item of data.result) {
          if (item.amount > 0) {
            this.m_items.push(item);
          }
        }
      }, err => {
        console.log(err);
      }
    );
    this.m_http.get('/api/login/' + this.m_userEan).subscribe(
      (data: APIResponse) => {
        this.m_user = data.result[0];
      },
      err => {
        console.error(err);
      }
    );
  }

  packItem(item) {
    this.m_item = item;
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
      this.allDone(1);
      this.m_http.put('/api/orders/' + item.ean, [ 1, this.m_userEan.toString()]).subscribe(
        (data: APIResponse) => {
          // this.m_items
          // window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  exit(){
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
  }

  update() {
    this.exit();
    this.allDone(this.m_amount);
    this.m_http.put('/api/orders/' + this.m_itemEan, [ this.m_amount, this.m_userEan.toString()]).subscribe(
      (data: APIResponse) => {
      },
      err => {
        console.log(err);
      }
    );
  }

  allDone(amount) {
    let del = -1;
    for(let i = 0; i < this.m_items.length; ++i) {
      if (this.m_items[i].ean === this.m_item.ean) {
        if (this.m_items[i].amount === amount) {
          del = i;
          break;
        } else {
          this.m_items[i].amount -= amount;
          break;
        }
      }
    }
    if (del !== -1) this.m_items.splice(del, 1);
    if (this.m_items.length === 0) this.m_complete = true;
  }

  despatch() {
    this.m_http.put('/api/orders/complete/' + this.m_orderEan, [this.m_userEan]).subscribe(
      (data: APIResponse) => {
      },
      err => {
        console.log(err);
      }
    );
    this.m_router.navigateByUrl('/log-order/user/' + this.m_userEan);
  }

}


