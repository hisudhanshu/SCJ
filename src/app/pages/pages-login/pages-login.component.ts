import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServicesService } from 'src/app/Service/auth-services.service'; 


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private router: Router, private authServices: AuthServicesService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  loginProcess() {

    if (this.formGroup.valid) {
      this.authServices.login(this.formGroup.value).subscribe(result => {
        if (result.message == 'Login Successful') {
          console.log(result);
          var myToken = result.token;
          window.localStorage.setItem("myToken", JSON.stringify(myToken));
          myToken = JSON.parse(localStorage.getItem('myToken') || '{}');


          this.authServices.setToken(myToken);


          this.router.navigateByUrl('/dashboard');
          alert(result.message);
        }
        else {
          alert(result.message);
        }
      })
    }
  }

}