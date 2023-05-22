import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
   successMessage: string = '';

  showPopup: boolean = false;

  saveProduct(): void {
    // Logic to save the product goes here

    // Display the pop-up message
    this.showPopup = true;

    // Hide the pop-up message after 3 seconds
    setTimeout(() => {
      this.showPopup = false;
    }, 3000);
  }
  ngOnInit(): void {

  }
}
