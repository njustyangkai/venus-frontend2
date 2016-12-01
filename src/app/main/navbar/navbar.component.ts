import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../util/http.service';
import { ApiConfig } from '../../util/ApiConfig';

@Component({
  selector: 'px-navbar',
  templateUrl: './navbar.component.html'
})

export class NavbarComponent {
  username:string;

  @ViewChild('modal1_template') modal1_template:any;
  modal1:any;

  @ViewChild('modal2_template') modal2_template:any;
  modal2:any;

  @ViewChild('modifyPwdForm') modifyPwdForm:any;

  constructor(private router:Router,
              private modalService:NgbModal,
              private http:HttpService) {
    this.username = window.localStorage.getItem('username');
  }

  open1() {
    this.modal1 = this.modalService.open(this.modal1_template, {
      backdrop: true,
      keyboard: true
    });
  }

  open2() {
    this.modal2 = this.modalService.open(this.modal2_template, {
      backdrop: true,
      keyboard: true
    });
  }

  logout() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  modifyPwd() {
    this.http.put(ApiConfig.USER + '/modifyPwd/' + window.localStorage.getItem('userId'), this.modifyPwdForm.form.value).subscribe(
        (res:any)=> {
          console.log(res);
        },
        (error:any)=> {
          console.log(error);
        }
    )
  }
}