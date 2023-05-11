import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthServicesService } from 'src/app/auth-services.service';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

formGroup!: FormGroup;
constructor( private router: Router, private authServices: AuthServicesService) {}
ngOnInit(): void {
  this.initForm();
}
initForm(){
  this.formGroup = new FormGroup({
    userName: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });
}

loginProcess(){
  // debugger

  if (this.formGroup.valid){
    this.authServices.login(this.formGroup.value).subscribe(result=>{
      this.router.navigate((['/dashboard']))

      console.log(result);

      if (result.success){
        console.log(result);
        alert(result.message);
      }
    
      else
      {
        alert(result.message);
        } 
    })
  }
}
}