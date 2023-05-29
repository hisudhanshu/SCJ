import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-material',
  templateUrl: './product-material.component.html',
  styleUrls: ['./product-material.component.css']
})
export class ProductMaterialComponent implements OnInit {

  userForm: FormGroup;
  listData: any;

  constructor(private fb: FormBuilder) {
    this.listData = [];

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }
  
  public addItem(): void {
    this.listData.push(this.userForm.value);
    this.userForm.reset();
  }
  reset() {
    this.userForm.reset();
  }
  removeItem(element: any) {
    this.listData.forEach((value: any, index: any) => {
      if (value == element) {
        this.listData.splice(index, 1);
      }
    });
  }

  ngOnInit() {}
}