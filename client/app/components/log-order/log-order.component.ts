import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APIResponse} from '../../interfaces/api-response.interface';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log-order',
  templateUrl: './log-order.component.html',
  styleUrls: ['./log-order.component.css']
})
export class LogOrderComponent implements OnInit {

  private m_orderEans = [];
  private m_orderEan = 0;
  private m_userEan = 0;
  private m_user = {};
  constructor(private m_http: HttpClient, private m_router: Router, private m_actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.m_http.get('/api/log-order').subscribe(
      (data: APIResponse) => {
        this.m_orderEans = data.result;
      },
      err => {
        console.error(err);
      }
    );
    this.m_actRoute.params.subscribe(
      params => {
        this.m_userEan = params['ean'];
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

  logOrder() {
    let isValid = false;
    for (const item of this.m_orderEans) {
      if (item.ean === this.m_orderEan) {
        console.log('Item found.');
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      alert('Order ean not found.');
    } else {
      console.log('Changing route.');
      this.m_router.navigateByUrl('/items/user/' + this.m_userEan + '/order/' + this.m_orderEan);
    }
  }

}
