import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {APIResponse} from "../../interfaces/api-response.interface";
import {constructDependencies} from "@angular/core/src/di/reflective_provider";
import {NgForm} from '@angular/forms';
import {forEach} from "@angular/router/src/utils/collection";
import {Router, RouterModule, Routes} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public m_eans = [];
  public m_ean = 0;
  constructor(private m_http: HttpClient, private m_router: Router ) {
  }

  ngOnInit() {
    this.m_http.get('/api/login').subscribe(
      (data: APIResponse) => {
        this.m_eans = data.result;
      }, err => {
        console.log(err);
      }
    );
  }

  login() {
    let isValid = false;
    for (const item of this.m_eans) {
      // console.log(item.ean + ' ' + this.m_ean);
      if (item.ean === this.m_ean) {
        console.log('Item found.');
        isValid = true;
        break;
      }
    }
    if (!isValid) {
      alert('User ean not found.');
    } else {
      console.log('Changing route.');
      this.m_router.navigateByUrl('/log-order/user/' + this.m_ean);
    }
  }

}
