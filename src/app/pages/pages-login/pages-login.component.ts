import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/auth-services.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service'; 

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private router: Router,
    private authServices: AuthServicesService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.authServices.login(this.formGroup.value).subscribe(result => {
        console.log(result);
        this.router.navigate(['/dashboard']);

        if (result.success) {
          this.sessionStorageService.setToken(result.token); // Store token in session storage
          var authToken = JSON.parse(result.token);
          console.log(authToken)
          this.router.navigate(['/dashboard']);
          alert(result.message);
        } else {
          alert(result.message);
        }
      });
    }
  }
}