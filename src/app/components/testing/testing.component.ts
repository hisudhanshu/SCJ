import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  
  successMessage: string = '';
  selectedCategory: string = '';
  selectedSubcategory: string = '';

  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  subcategories: string[] = [];

  addProduct(): void {
    // Your logic to add the product here

    // Show success message
    this.successMessage = 'Product added successfully';

    // Reset dropdown values
    this.selectedCategory = '';
    this.selectedSubcategory = '';
  }

  onCategoryChange(): void {
    // Logic to update subcategories based on the selected category
    // For simplicity, let's assume the subcategories are hard-coded here
    if (this.selectedCategory === 'Category 1') {
      this.subcategories = ['Subcategory 1.1', 'Subcategory 1.2'];
    } else if (this.selectedCategory === 'Category 2') {
      this.subcategories = ['Subcategory 2.1', 'Subcategory 2.2', 'Subcategory 2.3'];
    } else if (this.selectedCategory === 'Category 3') {
      this.subcategories = ['Subcategory 3.1'];
    } else {
      this.subcategories = [];
    }

    // Reset selected subcategory
    this.selectedSubcategory = '';
  }

  ngOnInit(): void {
    
  }  } 

  //  selectedOption1: string | undefined;
  // selectedOption2: string | undefined;

  // save() {
  //   console.log('Selected Option 1:', this.selectedOption1);
  //   console.log('Selected Option 2:', this.selectedOption2);
  //   // Replace with your saving logic for both dropdown values

  //   // Reset the dropdown values if needed
  //   this.selectedOption1 = '';
  //   this.selectedOption2 = '';
  // }
